<template>
  <view class="body">
    <view class="header">
      <view class="title">待办</view>
      <view class="add" @tap="addTodo">
        <u-icon name="plus" size="20" color="#000" />
      </view>
    </view>

    <view class="list">
      <u-checkbox-group placement="column">
        <u-swipe-action>
          <view class="uncompleted" v-for="(item, index) in toDoList">
            <u-swipe-action-item
              :options="option"
              @click="deleteTodo(index)"
              :duration="500"
              :key="item.id"
            >
              <view class="label">
                <u-checkbox
                  shape="circle"
                  @change="finish(index)"
                  :checked="false"
                  :key="item.id"
                />
                <view>{{ item.name }}</view>
              </view>
            </u-swipe-action-item>
          </view>

          <view class="completed" v-for="(item, index) in finishedToDoList">
            <u-swipe-action-item
              :options="option"
              @click="deleteUpTodo(index)"
              :duration="500"
              :key="item.id"
            >
              <view class="label">
                <u-checkbox
                  shape="circle"
                  @change="unfinish(index)"
                  :checked="true"
                  :key="item.id"
                />
                <view class="completed-task">{{ item.name }}</view>
              </view>
            </u-swipe-action-item>
          </view>
        </u-swipe-action>
      </u-checkbox-group>
      <u-popup
        :show="show"
        @close="close"
        @open="open"
        mode="bottom"
        :round="10"
      >
        <view class="pop">
          <u-textarea
            v-model="todo"
            placeholder="添加事项..."
            :rows="3"
            :autosize="true"
            maxlength="200"
            border="none"
          />
        </view>
        <view class="save" @tap="save">保存</view>
      </u-popup>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";

let toDoList = ref([
  { name: "吃饭", id: new Date().getTime() },
  { name: "睡觉", id: new Date().getTime() + 1 },
  { name: "打豆豆", id: new Date().getTime() + 2 },
]);
let finishedToDoList = ref([
  { name: "吃饭", id: new Date().getTime() + 3 },
  { name: "睡觉", id: new Date().getTime() + 4 },
  { name: "打豆豆", id: new Date().getTime() + 5 },
]);
const show = ref(false);
const todo = ref("");
const option = [
  {
    icon: "trash-fill",
    style: {
      backgroundColor: "#f56c6c",
      width: "22px",
      height: "22px",
      borderRadius: "100px",
      margin: "0 6px",
    },
  },
];

const deleteTodo = (index: number) => {
  toDoList.value.splice(index, 1);
};

const deleteUpTodo = (index: number) => {
  finishedToDoList.value.splice(index, 1);
};

const finish = (index: number) => {
  finishedToDoList.value.push(toDoList.value[index]);
  toDoList.value.splice(index, 1);
};

const unfinish = (index: number) => {
  toDoList.value.push(finishedToDoList.value[index]);
  finishedToDoList.value.splice(index, 1);
};

const open = () => {
  show.value = true;
};

const close = () => {
  show.value = false;
};

const addTodo = () => {
  open();
};

const save = () => {
  toDoList.value.push({ name: todo.value, id: new Date().getTime() });
  close();
  todo.value = "";
};
</script>

<style lang="scss">
.pop {
  padding: 20px 10px;
  border-radius: 10px;
}

.save {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 20px;
  border-radius: 10px;
}

.body {
  padding: 10px;
  margin: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  display: flex;
  font-size: 20px;
  font-weight: bold;
  margin-left: 10px;
  margin-top: 5px;
}

.add {
  display: flex;
  justify-content: flex-end;
  margin-right: 10px;
  margin-top: 5px;
}

.label {
  display: flex;
  align-items: center;
}

.list {
  display: flex;
  flex-direction: column;
  margin: 10px;
}

.list-item {
  margin-left: 10px;
}

.list-item:first-child {
  margin-left: 0;
}

.list-item:last-child {
  margin-right: 10px;
}

.list-item {
  font-size: 16px;
  color: #000;
}

.completed-task {
  color: #888; /* 灰色 */
  text-decoration: line-through; /* 删除线 */
}
</style>
