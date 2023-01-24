import dayjs, { Dayjs } from 'dayjs';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type TodoList = {
  id: number;
  content: string;
  date: Dayjs;
  isSuccess: boolean;
};

const defaultTodoList = [
  { id: 1, content: '운동하기', date: dayjs(), isSuccess: true },
  { id: 2, content: '강의듣기', date: dayjs(), isSuccess: false },
  { id: 3, content: '야식먹기', date: dayjs(), isSuccess: false },
  { id: 4, content: '아침먹기', date: dayjs(), isSuccess: false },
  { id: 5, content: '점심먹기', date: dayjs(), isSuccess: false },
  { id: 6, content: '치킨먹기', date: dayjs(), isSuccess: false },
  { id: 7, content: '피자먹기', date: dayjs(), isSuccess: false },
  { id: 8, content: '족발먹기', date: dayjs(), isSuccess: false },
  { id: 9, content: '프로틴먹기', date: dayjs(), isSuccess: false },
  { id: 10, content: '야채먹기', date: dayjs(), isSuccess: false },
];

const TODO_LIST_KEY = 'TODO_LIST_KEY';

export const useTodoList = (selectedDate: Dayjs) => {
  const [todoList, setTodoList] = useState<TodoList[]>(defaultTodoList);
  const [input, setInput] = useState<string>('');

  const saveTodoList = (newTodoList: TodoList[]) => {
    setTodoList(newTodoList);
    AsyncStorage.setItem(TODO_LIST_KEY, JSON.stringify(newTodoList));
  };

  const addTodo = () => {
    const len = todoList.length; // 3
    const lastId = len === 0 ? 0 : todoList[len - 1].id;

    const newTodoList = [
      ...todoList,
      {
        id: lastId + 1,
        content: input,
        date: selectedDate,
        isSuccess: false,
      },
    ];
    saveTodoList(newTodoList);
  };

  const removeTodo = (todoId: number) => {
    const newTodoList = todoList.filter((todo) => todo.id !== todoId);
    saveTodoList(newTodoList);
  };

  const toggleTodo = (todoId: number) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id !== todoId) return todo;
      return {
        ...todo,
        isSuccess: !todo.isSuccess,
      };
    });
    saveTodoList(newTodoList);
  };

  const resetInput = () => setInput('');

  const filteredTodoList = todoList.filter((todo: TodoList) => {
    const isSameDate = dayjs(todo.date).isSame(selectedDate, 'date');
    return isSameDate;
  });

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const result = await AsyncStorage.getItem(TODO_LIST_KEY);
    console.log('result', typeof result, result);
    if (result) {
      const newTodoList = JSON.parse(result);
      console.log('newTodoList', typeof newTodoList, newTodoList);
      ////
      setTodoList(newTodoList);
    }
  };

  return {
    todoList,
    filteredTodoList,
    addTodo,
    removeTodo,
    toggleTodo,
    input,
    setInput,
    resetInput,
  };
};
