# KivaProxy

# Installing
`
npm install --save @kivacrm/kiva-proxy
`
# Importing
ES6

```
import KivaProxy from '@kivacrm/kiva-proxy'
```

CommonJS

```
const KivaProxy = require('@kivacrm/kiva-proxy')
```

browser 

```
<script src="[path]/KivaProxy.min.js"></script>
```

# Examples



## Basic Usage
```javascript
const myAppTodo = new KivaProxy({endpoint:'myapp/todos'})

// get All Todo
myAppTodo.all()

// find Todo
myAppTodo.find(1)

// find Multiple Todo
myAppTodo.find([1,4,7])

// create Todo
myAppTodo.create({title:'Todo1', status:false})

// create multiple Todo
myAppTodo.create([
  {title:'Todo1', status:false}, 
  {title:'Todo2', status:false}
])

// update Todo
myAppTodo.update({record_id:1, title:'Updated Todo', status:true})

// update Multiple Todo
myAppTodo.update([
  {record_id:1, title:'Updated Todo', status:false},
  {record_id:2, title:'Updated Todo 2', status:true}
])

// delete Todo
myAppTodo.destroy(1)


// delete multipke Todo

myAppTodo.destroy([1,5,7])

```

# Advanced Settings
```javascript
const myAppTodo = new KivaProxy({endpoint:'myapp/todos'})

// Set view Id
myAppTodo.setViewId('all')

// Get Empty Setting
myAppTodo.getEmpty(false)

// Set Fields Settings
myAppTodo.setFields(['title', 'status'])

// Set filters Settings
myAppTodo.setFields({"status": ["=", true]})

// Set keyword Settings
myAppTodo.setKeyword('todo')

// Set Start Settings
myAppTodo.setStart(2)

// Set Limit Settings
myAppTodo.setLimit(10)

// Set Sort Settings
myAppTodo.setSort('title')

// Set Sort direction Settings
myAppTodo.setDir('DESC')

// get Results
myAppTodo.all()
```
## Short Way
```javascript
const myAppTodo = new KivaProxy({endpoint:'myapp/todos'})

myAppTodo
  .setViewId('all')
  .getEmpty(false)
  .setFields(['title', 'status'])
  .setFields({"status": ["=", true]})
  .setKeyword('todo')
  .setStart(2)
  .setLimit(10)
  .setSort('title')
  .setDir('DESC')
  .all()
```
## Clear Paramaters
```javascript
const myAppTodo = new KivaProxy({endpoint:'myapp/todos'})

myAppTodo
  .setKeyword('todo')
  .setLimit(10)
  .setSort('title')
  .setDir('DESC')
  .all()

// clear keyword parameters
myAppTodo.removeParameter('keyword')

// request again without keyword params
myAppTodo.all()
```
## Clear Multiple Paramater
```javascript
const myAppTodo = new KivaProxy({endpoint:'myapp/todos'})

myAppTodo
  .setKeyword('todo')
  .setLimit(10)
  .setSort('title')
  .setDir('DESC')
  .all()

// clear keyword and limit parameters
myAppTodo.removeParameter(['keyword', 'limit'])

// request again without keyword and limit params
myAppTodo.all()
```

## Clear All Paramaters
```javascript
const myAppTodo = new KivaProxy({endpoint:'myapp/todos'})

myAppTodo
  .setKeyword('todo')
  .setLimit(10)
  .setSort('title')
  .setDir('DESC')
  .all()

// clear keyword parameters
myAppTodo.clearParameters()

// request again without any params
myAppTodo.all()
```
