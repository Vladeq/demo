import { InputsScreenProps } from 'processes/navigation/main-stack/MainStackNavigator';
import React, { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, View } from 'react-native';
import { AppInput } from 'shared/ui';
import { DefaultLayout } from 'widgets';

// const TEST_ARR = [
//   { id: 1, text: 'Sena Ave, NY' },
//   { id: 2, text: 'Sena St, NY' },
//   { id: 3, text: 'Selikov St, NY' },
//   { id: 4, text: 'Омск' },
//   { id: 5, text: 'Новосибирск' },
// ];

interface FormData {
  email: string;
  testInput: string;
  search: string;
  search1: string;
}

const InputsScreen: FC<InputsScreenProps> = () => {
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {},
  });

  const exampleEmailValidationPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  const onFormSubmit = (values: FormData) => {
    console.log('values', values);
  };

  return (
    <DefaultLayout>
      <DefaultLayout.KeyboardAwareScrollView>
        {/* <Controller
          control={control}
          name="search"
          rules={{
            required: { value: true, message: 'Required' },
          }}
          render={({ field }) => (
            <AppInput.SearchField
              {...field}
              options={TEST_ARR}
              onChangeText={field.onChange}
              placeholder="Placeholder"
            />
          )}
        /> */}

        <Controller
          control={control}
          name="email"
          rules={{
            required: { value: true, message: 'Required' },
            pattern: { value: exampleEmailValidationPattern, message: 'Invalid email' },
          }}
          render={({ field, fieldState }) => (
            <AppInput.TextField
              {...field}
              onChangeText={field.onChange}
              label="Title"
              placeholder="Placeholder"
              error={fieldState.error?.message}
            />
          )}
        />

        <View style={{ width: 200 }}>
          <Controller
            control={control}
            name="testInput"
            rules={{
              required: { value: true, message: 'Required' },
            }}
            render={({ field, fieldState }) => (
              <AppInput.TextField
                {...field}
                onChangeText={field.onChange}
                placeholder="Placeholder"
                error={fieldState.error?.message}
              />
            )}
          />
        </View>

        <View style={{ marginBottom: 20 }}>
          <Button title="Test button" onPress={handleSubmit(onFormSubmit)} />
        </View>

        {/* <Controller
          control={control}
          name="search1"
          rules={{
            required: { value: true, message: 'Required' },
          }}
          render={({ field }) => (
            <AppInput.SearchField
              {...field}
              variant="secondary"
              options={TEST_ARR}
              onChangeText={field.onChange}
              placeholder="Placeholder"
            />
          )}
        /> */}
      </DefaultLayout.KeyboardAwareScrollView>
    </DefaultLayout>
  );
};

export default InputsScreen;
