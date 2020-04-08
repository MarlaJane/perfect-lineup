function checkSalaryTotal(lineup) {
  return lineup.reduce((salary, player) => {
    return salary + player.salary
  }, 0)
}

function checkTeamId(lineup) {
  return lineup.reduce((teams, player) => {
    teams[player.teamId] = teams[player.teamId] === undefined ? 1 : teams[player.teamId] + 1

    return teams
  }, {})
}

function checkGameId(lineup) {
  return lineup.reduce((games, player) => {
    games[player.gameId] = games[player.gameId] === undefined ? 1 : games[player.gameId] + 1

    return games
  }, {})
}

function checkPosition(lineup) {
  return lineup.reduce((positions, player) => {
    positions[player.position] = positions[player.position] === undefined ? 1 : positions[player.position] + 1

    return positions
  }, {})
}

function breaksSalaryCap(lineup) {
  return checkSalaryTotal(lineup) > 45000
}

function breaksTeamIdTotal(teams) {
  return Object.values(teams).some((count) => { return count > 2 })
}

function breaksGameIdTotal(games) {
  return Object.values(games).some((count) => { return count > 3 })
}
function breaksPositionTotal(positions) {
  return positions['P'] !== 1 || positions['C'] !== 1 || positions['1B'] !== 1 ||
    positions['2B'] !== 1 || positions['3B'] !== 1 || positions['SS'] !== 1 ||
    positions['OF'] !== 3
}

function validateLineup(lineup) {
  const teamIdTotals = checkTeamId(lineup)
  const gameIdTotals = checkGameId(lineup)
  const positionTotals = checkPosition(lineup)

  return !breaksSalaryCap(lineup) && !breaksTeamIdTotal(teamIdTotals) &&
    !breaksGameIdTotal(gameIdTotals) && !breaksPositionTotal(positionTotals)
}

module.exports = validateLineup
