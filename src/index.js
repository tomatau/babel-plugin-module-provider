const isEmpty = o => !Object.keys(o).length

const makeSpecifier = t => x =>
  t.importSpecifier(t.identifier(x), t.identifier(x))

export default ({types: t}) => ({
  visitor: { Program: {
    exit: ({node, scope}, state) => {
      const modules = state.opts

      if (isEmpty(modules)) return

      const defaultImport = binding => t.importDeclaration(
        [ t.importDefaultSpecifier(t.identifier(modules[binding])) ],
        t.stringLiteral(binding)
      )

      const nonDefaultImport = binding => {

        return t.importDeclaration(
          modules[binding].map(makeSpecifier(t)),
          t.stringLiteral(binding)
        )
      }

      Object.keys(modules).reverse().forEach(binding => {
        if(!scope.hasBinding(modules[binding]) && !Array.isArray(modules[binding])) {
          node.body.unshift(
            defaultImport(binding)
          )
        }
        if(!scope.hasBinding(modules[binding]) && Array.isArray(modules[binding])) {
          node.body.unshift(
            nonDefaultImport(binding)
          )
        }
      })
    }
  }}
})
