// List Model
const store = { lists: [], tasks: []}

const List = (function createList(){
  var id = 0;

  return class List {
    constructor(listTitle){
      this.id = ++id;
      this.listTitle = listTitle;
      store.lists = [...store.lists, this];
    }
  }


})();

$(function() {
  $('form#add_list').on('submit', function(event){
    event.preventDefault();
    let listTitle = $("[name='list_title']").val();
    let listObject = new List(listTitle);
    $("[name='list_title']").val('');
    //here we add find list element, create option element and attach it.
    let selectList = document.getElementById("select_list")
    var option = document.createElement("option");
    option.text = listObject.listTitle;
    // option.id = listObject.id;
    option.setAttribute('data-id', listObject.id);
    selectList.add(option);
    //This function below updates our list from store
    updateList()
  })
  $('body').on('click','.destroy-list', function(event){
    let deleteId = $(this).parent().next().data('id')
    store.lists.forEach(function(list){
      if (list.id == deleteId){
        let index = store.lists.indexOf(list);
        store.lists.splice(index, 1);
      };
    })
    updateList();
  })
})

function updateList(){

  //find list section
  let section = $('#lists')
  //create new list options
  listDivs = [...store.lists].map(function(listObj){
    let div = document.createElement("div");
    div.class = 'list';
    let h2 = document.createElement("h2");
    h2.innerHTML = listObj.listTitle
    let button = document.createElement("button")
    //adding delete button
    button.classList.add('destroy-list')
    button.innerHTML = 'x';
    h2.prepend(button)
    div.appendChild(h2)
    let ul = document.createElement("ul")
    ul.setAttribute('data-id' , listObj.id);
    div.appendChild(ul)
    return div
  })
  section.empty()
  section.append(listDivs)
  updateTask()
};
