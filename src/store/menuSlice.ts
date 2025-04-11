import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MenuItem } from '../types';

interface MenuState {
  items: MenuItem[];
}

const initialState: MenuState = {
  items: [
    {
      id: 1,
      name: "红烧肉",
      category: "主菜",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=300&q=80",
      tags: ["招牌", "家常菜"]
    },
    {
      id: 2,
      name: "清炒时蔬",
      category: "素菜",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=300&q=80",
      tags: ["健康", "低脂"]
    },
    {
      id: 3,
      name: "蒜蓉粉丝虾",
      category: "海鲜",
      image: "https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?auto=format&fit=crop&w=300&q=80",
      tags: ["鲜美", "高蛋白"]
    },
    {
      id: 4,
      name: "白米饭",
      category: "主食",
      image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=300&q=80",
      tags: ["经典", "百搭"]
    }
  ],
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    addMenuItem: (state, action: PayloadAction<MenuItem>) => {
      state.items.push(action.payload);
    },
  },
});

export const { addMenuItem } = menuSlice.actions;

export default menuSlice.reducer;