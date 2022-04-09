// Link node structure
// { prev: LinkNode, next: LinkNode, data: any}

const linkedList = () => {
  let head
  let tail
  
  const shift = () => {
    if (head != null) {
      if (head === tail) {
        head = null
        tail = null
      } else {
        const afterHead = head.next
        head.next = null // no dangling
        afterHead.prev = null
        head = afterHead
      }
    }
  }

  const unshift = (data) => {
    const newNode = { data: data }
    if (head == null) {
      head = newNode
      tail = newNode
    } else {
      const formerHead = head
      formerHead.prev = newNode
      newNode.next = formerHead
      head = newNode
    }
  }
  

  const push = (data) => {
    
    const newNode = { data: data }
    if (head == null) {
      head = newNode
      tail = newNode
    } else {
      // tail cannot be null when head isn't null
      tail.next = newNode
      newNode.prev = tail
      tail = newNode
    }

  }

  const pop = () => {
    if (head !== null) {
      if (head === tail) {
        const toBePoppedData = head.data
        head = null
        tail = null
        return toBePoppedData
      } else {
        // not the head position.
        const toBePoppedData = tail.data
        const previousOfCurrentTail = tail.prev
        tail.prev = null // no dangling
        previousOfCurrentTail.next = null
        tail = previousOfCurrentTail
        return toBePoppedData
      }
    }
  }

  const iterateItems = (itemVisited) => {
    if (head != null) {
      let curr = head
      while (curr != null) {
        
        itemVisited?.call(null, curr.data)
        curr = curr.next
      }
    }
  }

  const count = () => {
    let num = 0
    let curr = head
    while (curr != null) {
      num++
      curr = curr.next
    }

    return num
  }

  return {
    push,
    pop,
    unshift,
    shift,
    iterateItems,
    count
  }
}

// Now, let's test the hash
/*
const hash = {}

hash['Paul'] = { name: 'Paul', age: 29 }
hash['Rhonda'] = { name: 'Rhonda', age: 48 }
console.log(JSON.stringify(hash['Paul']))
console.log(JSON.stringify(hash['Mary'])) // returns undefined
console.log(`Is mary undefined? ${hash['Mary'] === undefined}`) // returns true
// How do we delete an item?

console.log(`Rhonda before delete: ${JSON.stringify(hash['Rhonda'])}`)
delete hash['Rhonda']
console.log(`Rhonda after delete: ${JSON.stringify(hash['Rhonda'])}`)
*/

const lruCache = (masterList, limit, getKeyValue) => {

  const { push, pop, unshift, count, iterateItems } = linkedList()
  const hash = {}

  const access = (key) => {
    if(hash[key] === undefined) {
      const itemFromMaster = masterList.find(item => key === getKeyValue(item))
      if (itemFromMaster != null) {
        hash[key] = itemFromMaster
        unshift(itemFromMaster)        
      }
    } else {
      /* if we found it in the hash.... it's on the linkedList.
      */
    }

    if (limit < count()) {
      // We boot the last item in the linked list
      const poppedData = pop()
      // Now, delete the poppedData from the hash
      delete hash[getKeyValue(poppedData)]
    }

    // We're going to output the display for every access...
    iterateItems((item) => {
      console.log(`Item in Linked List: ${JSON.stringify(item)}`)
    })
    // Let's iterate the hash
    for(const key of Object.keys(hash)) {
      console.log(`Hash: ${key}: ${JSON.stringify(hash[key])}`)
    }
  }

  return {
    access
  }
}

const masterList = [
  { name: 'Paul', age: 29 },
  { name: 'Rhonda', age: 48 },
  { name: 'Mike', age: 3 },
  { name: 'Mary', age: 17 },
  { name: 'Karl', age: 42 },
  { name: 'Bob', age: 63 },
  { name: 'Diane', age: 37 },
]

const { access } = lruCache(masterList, 3, (item) => item.name)
access('Paul')
access('Mary')


/*
const { push, pop, iterateItems, shift, unshift, count } = linkedList()

push({ name: 'Paul', age: 29 })
push({ name: 'Rhonda', age: 48 })
push({ name: 'Mike', age: 3})
unshift({ name: 'Mary', age: 17})
unshift({ name: 'Karl', age: 42})
unshift({ name: 'Bob', age: 63})
shift()
pop()

iterateItems((item) => {
  console.log(`Item visited: ${JSON.stringify(item)}`)
})

console.log(`there are ${count()} items in the list`)
*/