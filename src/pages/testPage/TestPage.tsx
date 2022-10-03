import { Route } from 'react-router-hoc';

const TestPageRoute = Route('/test');

export const TestPage = TestPageRoute(() => {
  return <>test page</>;
});

export default TestPage;
