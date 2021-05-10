# My Locations React APP with Typescript.
This App allows the user to maintain a list of categorized name locations.
The domain model has two main entities: Category and Location.

## Category
Category has a single property: name. 

## Location
Location has the following properties: name, address, coordinates, and category.

All properties of the entities are required.

### Use Cases
- The user can view a list of all existing categories.
- When the user chooses a category from the list, it is highlighted, and they can click any of
the actions in the toolbar to manage the category - *edit*, *view details*, *delete*.

- There is a permanent toolbar at the top, for all screens. It contains a title and actions. 
The title and actions update according to context. 
For example, when the user is in the “category list” or “new category” screens there is no specific category in the context so it
doesn’t make sense to make the “edit” / “delete” actions available. 
The title in this case can be “Categories” and the only available action is “new category”. 
If there is a category in context the available actions would be *edit*, *delete*, *view*.
- The user can create a new category (this action is also in the toolbar).

## Tech Stack
- React v17.0.2
- Typescript v4.2.4
- All data is saved to the local storage of the browser (an HTML5 feature) for simplicity.