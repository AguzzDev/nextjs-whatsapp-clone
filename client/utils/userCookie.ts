import { MeFragment, useMeQuery } from "generated/graphql";

export const userCookie = () => {
  const { data, loading } = useMeQuery();

  if (!loading) {
    return { user: data?.me, loading };
  }

  return { user: null, loading };
};
