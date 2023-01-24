import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { removeQueryFromUrl } from 'utils';

const SkeletonViewer = (gssp: GetServerSideProps) => {
  return async (context: GetServerSidePropsContext) => {
    const { res, req } = context;

    const resolvedUrl = removeQueryFromUrl(context.resolvedUrl);
    const fromSkeleton = !!+req.cookies.fromSkeleton!;

    if (!fromSkeleton) {
      res.setHeader('Location', `${resolvedUrl}/loading`);
      res.statusCode = 301;

      return { props: {} };
    }

    res.setHeader('set-cookie', `fromSkeleton=0; path=/; `);

    return gssp(context);
  };
};

export default SkeletonViewer;
