export const ComposedProvider = ({ providers, children }) => 
  providers.reduceRight(
    (acc, Provider) => <Provider>{acc}</Provider>, 
    children
  );