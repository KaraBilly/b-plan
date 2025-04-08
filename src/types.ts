export interface MenuItem {
  id: number;
  name: string;
  category: string;
  image: string;
  tags?: string[]; // 添加 tags 属性
}

export interface OrderItem extends MenuItem {
  quantity: number;
}