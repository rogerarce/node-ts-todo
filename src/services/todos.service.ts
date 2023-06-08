/**
 * Todos Service
 *
 * Contains CRUD Operations for todo entity
 */
type Todo = {
	todo_id: string;
	todo: string;
	completed: boolean;
	completed_date: Date;
	is_deleted: boolean;
}

type UpdateResponse = {
	updated_items: number;
	status: boolean;
}

let todo_items: Todo[] = [];

/**
 * Add New Item
 *
 * @param item TODO
 * @returns Promise<Todo>
 */
export const create = async (item: Omit<Todo, 'todo_id'>): Promise<Todo> => {
	const newItem: Todo = { ...item, todo_id: todo_items.length.toString() };
	todo_items.push(newItem);
	return newItem;
}

/**
 * Get Item or Items
 *
 * @returns Promise<Todo[] | Todo>
 */
export const get = async (todoId?: string): Promise<Todo[] | Todo> => {
	if (todoId) {
		return todo_items[parseInt(todoId)];
	}

	return todo_items;
}

/**
 * Update an Item
 *
 * @param todoId String
 * @param todo Todo
 * @returns Promise<UpdateResponse>
 */
export const update = async (todoId: string, todo: Partial<Todo>): Promise<UpdateResponse> => {
	let updatedItems = 0;

	todo_items = todo_items.map((item) => {
		if (item.todo_id === todoId) {
			updatedItems = 1;
			return { ...item, ...todo };
		}

		return item;
	});

	return { updated_items: updatedItems, status: true };
}

/**
 * Remove an Item 
 *
 * @param todoId String
 * @returns Promise<boolean>
 */
export const remove = async (todoId: string): Promise<boolean> => {
	todo_items = todo_items.filter((item: Todo) => {
		if (item.todo_id !== todoId) {
			return item;
		}
	});

	return true;
}
