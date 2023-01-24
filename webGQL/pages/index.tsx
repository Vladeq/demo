import type { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { LocalTypes } from '../../public/locales/types';
import HomePage from '../pagesComponents/HomePage/HomePage';

export const getStaticProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, [
      LocalTypes.UI,
      LocalTypes.COMMON,
      LocalTypes.AUTH_PAGE,
      LocalTypes.HOME_PAGE,
    ])),
  },
});

export default HomePage;
