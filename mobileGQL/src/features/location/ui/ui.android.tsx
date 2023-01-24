import { useEffect, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import BackgroundJob from 'react-native-background-actions';
import { useInterval } from 'shared/hooks';

import { useLocation } from '../model';

const DELAY = 3000;

const options = {
  taskName: 'GPS coordinates',
  taskTitle: 'GPS coordinates',
  taskDesc: 'Initiate',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  parameters: {
    delay: DELAY,
  },
};

const UpdateLocation = () => {
  const [appState, setAppState] = useState<AppStateStatus>();

  const { getPosition } = useLocation();

  const sleep = (time: number) => new Promise<void>((resolve) => setTimeout(() => resolve(), time));

  const taskRandom = async (taskData: any) => {
    await new Promise(async () => {
      const { delay } = taskData;
      while (BackgroundJob.isRunning()) {
        getPosition();
        await sleep(delay);
      }
    });
  };

  useEffect(() => {
    const appStateListener = AppState.addEventListener('change', async (state) => {
      setAppState(state);
      if (state === 'background') {
        try {
          console.log('Trying to start background service'); //TODO remove log
          await BackgroundJob.start(taskRandom, options);
          console.log('Successful start!'); //TODO remove log
        } catch (e) {
          console.log('Error background service', e);
        }
      } else {
        console.log('Stop background service'); //TODO remove log
        await BackgroundJob.stop();
      }
    });
    return () => {
      appStateListener.remove();
      BackgroundJob.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useInterval(() => {
    appState !== 'background' && getPosition();
  }, DELAY);

  return null;
};

export default UpdateLocation;
