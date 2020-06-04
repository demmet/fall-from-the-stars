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

  citySelect.innerHTML = "<option value=''>Selecione a Cidade</option>"
  citySelect.disabled = true

  fetch(url)
    .then(res => res.json())
    .then(cities => {
      for(const city of cities) {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
      }

      citySelect.disabled = false
    })
}

populateUFs()

ufSelect.addEventListener("change", populateCities)

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem)
}

let selectedItems = []
const collectedItems = document.querySelector("input[name=items]")

function handleSelectedItem(event) {
  const itemLi = event.target

  itemLi.classList.toggle("selected")
  
  const itemId = event.target.dataset.id
  
  const alreadySelected = selectedItems.findIndex(item => item == itemId)

  if (alreadySelected >= 0) {
    selectedItems = selectedItems.filter(item => item != itemId)
  } else {
    selectedItems.push(itemId)
  }

  collectedItems.value = selectedItems
}
