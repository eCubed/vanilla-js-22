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
        console.log(`To be popped: ${toBePoppedData.name}`)
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

  const find = (key, getKeyValue) => {
    return findNode(key, getKeyValue)?.data
  }

  const findNode = (key, getKeyValue) => {
    let curr = head
    while (curr != null) {
      if (key === getKeyValue(curr.data)) {
        break
      }
      curr = curr.next
    }

    return curr
  }

  const remove = (key, getKeyValue) => {
    console.log(`To be removed key: ${key}`)
    const toRemove = findNode(key, getKeyValue)
    if (toRemove != null) {
      if (toRemove === head) {
        if (toRemove === tail) {
          head = null
          tail = null
        } else {
          console.log(`toRemove is head, but not tail`)
          const newHead = toRemove.next
          if (newHead != null) {
            newHead.prev = null // no dangling refs
          }
          toRemove.next = null // no dangling refs
          head = newHead
          return toRemove.data
        }
      } else {
        // toRemove is NOT head... it could be the tail!
        const previousToToRemove = toRemove.prev // could be head, but it wouldn't matter
        const nextToRemove = toRemove.next // could be tail, and we'll handle that

        previousToToRemove.next = toRemove.next
        if (nextToRemove != null) {
          nextToRemove.prev = previousToToRemove
        } else {
          tail = previousToToRemove
        }

        // undangle
        toRemove.prev = null
        toRemove.next = null
        return toRemove.data
      }
    }

    return null
  }

  return {
    push,
    pop,
    unshift,
    shift,
    iterateItems,
    count,
    find,
    remove
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

  const { pop, unshift, count, iterateItems, remove } = linkedList()
  const hash = {}

  const access = (key) => {
    if(hash[key] === undefined) {
      const itemFromMaster = masterList.find(item => key === getKeyValue(item))
      if (itemFromMaster != null) {
        hash[key] = itemFromMaster
        unshift(itemFromMaster)        
      }
    } else {
      // if we found it in the hash.... it's on the linkedList.
      const itemFoundInHash = remove(key, getKeyValue)
      // Then we add it back to the front of the linked list
      unshift(itemFoundInHash)
    }

    if (count() > limit) {
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

    console.log(`--------------------------------------------`)
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
access('Rhonda')
// Test 1. Let's see if it will boot the last one - Paul. Yes. it did
access('Bob')
// Test 2. Let's see if it will move Rhonda to the top if I access her again. It did!
access('Rhonda')
// Test 3. Let's see if it will add Paul again to the top // but that booted mary!
access('Paul')
// Test 3. Let's see of Bob goes back to the top of the list
access('Bob')
// Test 4. Now let's add Karl. There should be a new item in the hash
access('Karl')

/*
const { push, pop, iterateItems, shift, unshift, count, find, remove } = linkedList()

push({ name: 'Paul', age: 29 })
push({ name: 'Rhonda', age: 48 })
push({ name: 'Mike', age: 3})
unshift({ name: 'Mary', age: 17})
unshift({ name: 'Karl', age: 42})
unshift({ name: 'Bob', age: 63})


iterateItems((item) => {
  console.log(`Item visited: ${JSON.stringify(item)}`)
})

const found = find('Paul', (item) => item.name)
console.log(`Found: ${JSON.stringify(found)}`)
const itemThatShouldNotExist = find('Jane', (item) => item.name)
console.log(`Should be null or undefined: ${JSON.stringify(itemThatShouldNotExist)}`)

const removedItem = remove('Mike', item => item.name) // move mike to the top
unshift(removedItem)
iterateItems((item) => {
  console.log(`Item visited: ${JSON.stringify(item)}`)
})


console.log(`there are ${count()} items in the list`)
*/
