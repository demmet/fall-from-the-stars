const ufSelect = document.querySelector("select[name=uf]")
const citySelect = document.querySelector("select[name=city]")

function populateUFs() {
  const url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados"

  fetch(url)
    .then(res => res.json())
    .then(states => {
      for(const state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
      }
    })
}

function populateCities(event) {
  const stateInput = document.querySelector("input[name=state]")

  const ufId = event.target.value

  const indexOfSelectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectedState].text

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufId}/municipios`

  fetch(url)
    .then(res => res.json())
    .then(cities => {
      citySelect.disabled = (cities.length == 0)

      citySelect.innerHTML = "<option value=''>Selecione a Cidade</option>"

      for(const city of cities) {
        citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
      }
    })
}

function updateSelectedCity(event) {
  const cityInput = document.querySelector("input[name=city]")

  const indexOfSelectedState = event.target.selectedIndex
  cityInput.value = event.target.options[indexOfSelectedState].text
}

populateUFs()

ufSelect.addEventListener("change", populateCities)
citySelect.addEventListener("change", updateSelectedCity)
