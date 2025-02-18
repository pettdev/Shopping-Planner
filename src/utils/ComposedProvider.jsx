export const ComposedProvider = ({ providers, children }) => {
  return providers.reduceRight((acc, Provider) => {
    return <Provider>{acc}</Provider>
  }, children)
}