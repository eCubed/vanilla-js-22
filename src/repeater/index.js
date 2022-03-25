import { setupRepeater } from './repeater.js'

const items = [
  { name: 'John Smith', age: 22 },
  { name: 'Susan Sample', age: 35 },
  { name: 'Wayne Brown', age: 25 },
  { name: 'Lynn Jones', age: 55 },
  { name: 'Frank Sinatra', age: 35 },
]

const renderItem = (item, index) => {
  const itemDiv = document.createElement('div')
  itemDiv.setAttribute('id', `item-${index}`)
  itemDiv.setAttribute('class', 'repeater-item')

  const label = document.createElement('span')
  label.innerText = `${item.name}, ${item.age}`
  itemDiv.appendChild(label)

  const deleteButton = document.createElement('button')
  deleteButton.innerText = 'X'
  deleteButton.addEventListener('click', () => {
    const deleteIndex = items.indexOf(item)
    items.splice(deleteIndex, 1)
    setupRepeater('repeater-parent', items, renderItem)
  })
  itemDiv.append(deleteButton)
  return itemDiv
}

setupRepeater('repeater-parent', items, renderItem)

document.getElementById('add-item-button').addEventListener('click', () => {
  items.push({ name: 'New Person', age: 111})
  console.log(JSON.stringify(items))

  setupRepeater('repeater-parent', items, renderItem)

})