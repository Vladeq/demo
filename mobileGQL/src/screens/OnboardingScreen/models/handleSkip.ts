import AppRoutes from 'shared/routes';
import { NavigationService } from 'shared/services';

export const handleSkip = () => {
  NavigationService.reset([{ name: AppRoutes.MainBottomTab }]);
};
