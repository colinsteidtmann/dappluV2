const {alias} = require('react-app-rewire-alias')


module.exports = function override(config) {
  alias({
    '#components': 'src/components',
    '#Contracts' : 'src/components/Contracts',
    '#ContractsSharedComponents' : 'src/components/Contracts/ContractsSharedComponents',
    '#Home' : 'src/components/Home',
    '#HomeSharedComponents' : 'src/components/Home/HomeSharedComponents',
    '#Hub' : 'src/components/Hub',
    '#HubSharedComponents' : 'src/components/Hub/HubSharedComponents',
    '#Hooks' : 'src/Hooks/Hooks',
    '#GlobalSharedComponents' : 'src/components/SharedComponents',
    '#Images' : 'src/images',
    '#Data' : 'src/data/index',
  })(config)

  return config
}