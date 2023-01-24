import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { LocalTypes } from '../../../public/locales/types';
import { ListApartmentsShort } from '../../pagesComponents';

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, [
      LocalTypes.UI,
      LocalTypes.COMMON,
      LocalTypes.AUTH_PAGE,
      LocalTypes.LIST_APARTMENTS_PAGE,
      LocalTypes.HOME_PAGE,
    ])),
  },
});

export default ListApartmentsShort;
