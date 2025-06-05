
# Vue.js 3 与 Vue Router 深度解析文档

本文档旨在提供一个全面而详细的 Vue.js 3 (以下简称 Vue) 及其官方路由管理器 Vue Router 的学习指南。内容涵盖从基础概念到高级用法，帮助开发者快速掌握并能在实际项目中熟练应用。

## 第一部分：Vue.js 3 核心概念

Vue 是一套用于构建用户界面的**渐进式框架**。它的核心库只关注视图层，易于上手，也便于与第三方库或既有项目整合。

### 1. 创建与初始化 Vue 应用

**先决条件**: 安装 Node.js (推荐最新 LTS 版本)。

**项目创建**: 使用官方脚手架 `create-vue` (基于 Vite)。

```javascript
npm create vue@latest
```

根据命令行提示选择项目配置，如 TypeScript, JSX 支持, Vue Router, Pinia 状态管理等。

**项目启动**:

```javascript
cd <your-project-name>
npm install
npm run dev
```

**基本应用实例 (`main.js`)**:

```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue' // 根组件

// 创建 Vue 应用实例
const app = createApp(App)

// 将应用挂载到 DOM 元素上
app.mount('#app')
```

**根组件 (`App.vue`) 示例**:

```javascript
<template>
  <div>
    <h1>{{ message }}</h1>
    <button @click="changeMessage">改变消息</button>
  </div>
</template>

<script setup>
// 从 'vue' 导入 ref 创建响应式数据
import { ref } from 'vue'

// 定义一个响应式数据 'message'
const message = ref('你好 Vue 3!')

// 定义一个方法来修改 'message'
function changeMessage() {
  message.value = '消息已改变!' // ref 创建的响应式数据通过 .value 访问
}
</script>

<style scoped>
/* scoped 样式只作用于当前组件 */
h1 {
  color: #42b983;
}
</style>
```

### 2. 模板语法 (Template Syntax)

Vue 使用基于 HTML 的模板语法，允许开发者声明式地将 DOM 绑定到 Vue 实例的数据。

- **文本插值**: 使用双大括号 `{{ }}` (Mustaches)。

    ```javascript
    <p>消息: {{ pageTitle }}</p>
    <p>原始 HTML (v-html): <span v-html="rawHtmlContent"></span></p>
    ```
    
- **属性绑定**: 使用 `v-bind` 指令，可简写为 `:`。

    ```javascript
    <div v-bind:id="dynamicId"></div>
    <img :src="imageUrl" :alt="imageAltText">
    <button :disabled="isButtonDisabled">一个按钮</button>
    ```
    
- **JavaScript 表达式**: 模板插值和 `v-bind` 中支持单个 JavaScript 表达式。

    ```javascript
    {{ count + 1 }}
    {{ user.isActive ? '激活' : '未激活' }}
    <div :class="{ active: isActive, 'text-danger': hasError }"></div>
    <div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
    ```
    

### 3. 指令 (Directives)

指令是带有 `v-` 前缀的特殊 attribute，用于在 DOM 上应用响应式行为。

- **`v-if`, `v-else-if`, `v-else`**: 条件渲染。DOM 元素会根据条件被实际插入或移除。

    ```javascript
    <div v-if="type === 'A'">类型 A</div>
    <div v-else-if="type === 'B'">类型 B</div>
    <div v-else>其他类型</div>
    ```
    
- **`v-show`**: 条件显示。元素始终会被渲染，仅通过 CSS `display` 属性切换显隐。

    ```javascript
    <h1 v-show="isVisible">你好!</h1>
    ```
    
- **`v-for`**: 列表渲染。用于遍历数组或对象。务必提供 `key` attribute 以优化性能和状态保持。

    ```javascript
    <ul>
      <li v-for="(item, index) in items" :key="item.id">
        {{ index }} - {{ item.name }}
      </li>
    </ul>
    <div v-for="(value, key, index) in myObject" :key="key">
      {{ index }}. {{ key }}: {{ value }}
    </div>
    ```
    
- **`v-on`**: 事件监听。可简写为 `@`。

    ```javascript
    <button v-on:click="incrementCounter">增加计数</button>
    <input @input="handleInput" @keyup.enter="submitForm">
    ```
    
- **`v-model`**: 表单输入双向数据绑定。自动根据控件类型选择正确的方式来更新元素。

    ```javascript
    <input v-model="textMessage" placeholder="输入文本">
    <p>输入的是: {{ textMessage }}</p>
    
    <input type="checkbox" v-model="isChecked" id="checkbox">
    <label for="checkbox">{{ isChecked }}</label>
    
    <select v-model="selectedOption">
      <option disabled value="">请选择</option>
      <option>A</option>
      <option>B</option>
    </select>
    ```
    
- **`v-slot`**: 用于组件内容分发 (插槽)，详见组件部分。
    
- **`v-pre`**: 跳过该元素及其子元素的编译过程。用于显示原始 Mustache 标签。
    
- **`v-cloak`**: 保持在元素上直到关联实例结束编译。配合 CSS `[v-cloak] { display: none }` 可解决闪烁问题。
    
- **`v-once`**: 只渲染元素和组件一次。随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过。
    

### 4. 响应式基础 (Reactivity Fundamentals)

Vue 的核心是其响应式系统，它使得数据变化能够自动反映到视图上。

- **`ref`**: 创建基本类型 (string, number, boolean, etc.) 或对象类型的响应式数据。返回一个 ref 对象，其值通过 `.value` 属性访问。

    ```javascript
    <script setup>
    import { ref } from 'vue'
    
    const count = ref(0) // count 是一个 ref 对象
    const user = ref({ name: '张三', age: 30 })
    
    function increment() {
      count.value++
    }
    function changeUserName() {
      user.value.name = '李四' // 对象属性也是响应式的
    }
    </script>
    <template>
      <button @click="increment">{{ count }}</button>
      <p>{{ user.name }}</p>
    </template>
    ```

    在模板中使用 ref 时，会自动解包，无需 `.value`。
    
- **`reactive`**: 仅用于创建对象类型的响应式代理 (包括数组和 Map、Set 等内置类型)。返回对象本身的一个响应式代理。

    ```javascript
    <script setup>
    import { reactive } from 'vue'
    
    const state = reactive({
      count: 0,
      user: {
        name: 'Vue 用户'
      },
      list: ['苹果', '香蕉']
    })
    
    function increment() {
      state.count++
    }
    function addUserSkill() {
        state.user.skills = ['JavaScript', 'HTML']; // 新增属性也是响应式的
    }
    function addItemToList() {
        state.list.push('橙子'); // 数组操作也是响应式的
    }
    </script>
    ```

    `reactive` 对于对象是深度响应的。
    

### 5. 计算属性 (Computed Properties)

用于声明依赖于其他响应式数据并进行计算得出的值。计算属性会缓存其结果，仅当其依赖的响应式数据发生改变时才会重新计算。

```javascript
<script setup>
import { ref, computed } from 'vue'

const books = ref([
  { id: 1, title: 'Vue.js 权威指南', price: 50, quantity: 2 },
  { id: 2, title: 'JavaScript 高级程序设计', price: 80, quantity: 1 }
])

const totalAmount = computed(() => {
  console.log('Calculating total amount...'); // 依赖变化时才会执行
  return books.value.reduce((sum, book) => sum + book.price * book.quantity, 0)
})

// 可写的计算属性
const firstName = ref('王')
const lastName = ref('小明')

const fullName = computed({
  get() {
    return `${firstName.value} ${lastName.value}`
  },
  set(newValue) {
    const names = newValue.split(' ')
    firstName.value = names[0]
    lastName.value = names[names.length - 1] || ''
  }
})

function changeFullName() {
  fullName.value = '赵 小红'
}
</script>

<template>
  <p>书籍总价: ¥{{ totalAmount }}</p>
  <input v-model="fullName"> <!-- 双向绑定到可写计算属性 -->
  <button @click="changeFullName">改为赵小红</button>
</template>
```

### 6. 侦听器 (Watchers)

当需要在数据变化时执行异步操作或开销较大的操作，或者观察某个数据变化并执行特定逻辑时使用。

- **`watch`**: 侦听一个或多个特定的响应式数据源，并在数据源变化时执行回调。

    ```javascript
    <script setup>
    import { ref, reactive, watch } from 'vue'
    
    const question = ref('')
    const answer = ref('提问通常需要一个问号。;-)')
    const searchFilters = reactive({ term: '', category: 'all' })
    
    // 侦听 ref
    watch(question, async (newQuestion, oldQuestion) => {
      if (newQuestion.includes('?')) {
        answer.value = '思考中...'
        try {
          // 模拟 API 请求
          await new Promise(resolve => setTimeout(resolve, 1000))
          answer.value = Math.random() > 0.5 ? '是的' : '不是'
        } catch (error) {
          answer.value = '错误! 无法获取答案。' + error
        }
      }
    })
    
    // 侦听 getter 函数
    watch(
      () => searchFilters.term,
      (newTerm, oldTerm) => {
        console.log(`搜索词从 "${oldTerm}" 变为 "${newTerm}"`)
      }
    )
    
    // 侦听整个 reactive 对象 (需要 deep: true 进行深度侦听，或直接侦听属性)
    watch(searchFilters, (newFilters, oldFilters) => {
      console.log('筛选条件变化了:', newFilters)
    }, { deep: true }) // deep: true 侦听嵌套属性变化
    
    // 侦听多个源
    watch([() => searchFilters.term, () => searchFilters.category], ([newTerm, newCategory], [oldTerm, oldCategory]) => {
        console.log(`词: ${newTerm}, 分类: ${newCategory}`);
    })
    
    // watch 选项: immediate (立即执行回调), flush ('pre', 'post', 'sync') 控制回调时机
    watch(question, (val) => console.log('问题立即执行:', val), { immediate: true })
    </script>
    ```
    
- **`watchEffect`**: 立即执行一个函数，同时响应式地追踪其依赖，并在依赖更改时重新执行该函数。

    ```javascript
    <script setup>
    import { ref, watchEffect } from 'vue'
    
    const userID = ref(1)
    const userData = ref(null)
    
    watchEffect(async () => {
      // 此函数会立即执行，并在 userID.value 变化时再次执行
      console.log(`watchEffect 触发，当前 userID: ${userID.value}`)
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${userID.value}`)
      userData.value = await response.json()
    })
    
    function loadNextUser() {
      userID.value++
    }
    </script>
    ```

    `watchEffect` 适用于依赖关系不明确或需要自动追踪的场景。
    

### 7. 生命周期钩子 (Lifecycle Hooks)

Vue 组件实例从创建到销毁会经历一系列阶段，在这些阶段会触发相应的生命周期钩子函数，允许开发者在特定时刻执行自定义逻辑。

在 `<script setup>` 中使用时，需要从 `vue` 导入并直接调用：

```javascript
<script setup>
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted, ref } from 'vue'

const myData = ref('初始数据')

console.log('setup: 组件创建前 (类似 beforeCreate 和 created)')

onBeforeMount(() => {
  console.log('onBeforeMount: 组件挂载到 DOM 前')
})

onMounted(() => {
  console.log('onMounted: 组件已挂载到 DOM')
  // 可以在此访问 DOM
  // document.getElementById('myElement').textContent = '通过 onMounted 修改'
})

onBeforeUpdate(() => {
  console.log('onBeforeUpdate: 数据更新，DOM 重新渲染前')
})

onUpdated(() => {
  console.log('onUpdated: 数据更新，DOM 重新渲染后')
})

onBeforeUnmount(() => {
  console.log('onBeforeUnmount: 组件卸载前')
  // 在此进行清理操作，如清除定时器、解绑全局事件监听器
})

onUnmounted(() => {
  console.log('onUnmounted: 组件已卸载')
})
</script>

<template>
  <p id="myElement">{{ myData }}</p>
  <button @click="myData = '数据已更新'">更新数据</button>
</template>
```

**其他钩子**:

- `onErrorCaptured((err, instance, info) => {})`: 捕获来自后代组件的错误。
    
- `onRenderTracked` / `onRenderTriggered`: 调试钩子，用于追踪响应式依赖。
    
- `onActivated` / `onDeactivated`: 用于被 `<KeepAlive>` 缓存的组件。
    
- `onServerPrefetch`: SSR (服务器端渲染) 相关。
    

### 8. 组件 (Components)

组件是 Vue 的核心，允许将 UI 划分为独立、可复用的单元。

#### a. 定义组件 (SFC - Single File Component)

例如，创建一个按钮组件 `CustomButton.vue`:

```javascript
// components/CustomButton.vue
<template>
  <button
    class="custom-button"
    :style="{ backgroundColor: color, color: textColor }"
    @click="onButtonClick"
  >
    <slot></slot> <!-- 默认插槽，用于接收父组件传递的按钮文本或内容 -->
  </button>
</template>

<script setup>
// defineProps 用于声明组件的 props
const props = defineProps({
  color: {
    type: String,
    default: '#42b983' // 默认背景色
  },
  textColor: {
    type: String,
    default: 'white' // 默认文字颜色
  }
})

// defineEmits 用于声明组件可以触发的自定义事件
const emit = defineEmits(['customClick'])

function onButtonClick(event) {
  emit('customClick', { message: '按钮被点击了!', originalEvent: event }) // 触发事件并传递数据
}
</script>

<style scoped>
.custom-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}
.custom-button:hover {
  opacity: 0.8;
}
</style>
```

`defineProps` 和 `defineEmits` 是 `<script setup>` 中专用的编译宏，无需导入。

#### b. Props (属性)

Props 是父组件向子组件传递数据的方式。Props 可以是各种类型，并可以设置默认值、进行类型校验等。

**在父组件中使用 `CustomButton`**:

```javascript
// ParentComponent.vue
<template>
  <div>
    <CustomButton
      color="blue"
      textColor="yellow"
      @customClick="handleCustomButtonClick"
    >
      蓝色按钮
    </CustomButton>

    <CustomButton @customClick="handleCustomButtonClick">
      默认按钮
    </CustomButton>
    <p v-if="clickMessage">{{ clickMessage }}</p>
  </div>
</template>

<script setup>
import CustomButton from './components/CustomButton.vue'
import { ref } from 'vue'

const clickMessage = ref('')

function handleCustomButtonClick(payload) {
  console.log('Custom button clicked:', payload)
  clickMessage.value = payload.message
}
</script>
```

#### c. Events (`$emit`)

子组件通过 `emit` 函数向父组件触发事件，从而实现子组件向父组件通信。

#### d. Slots (插槽)

插槽是 Vue 实现的内容分发 API，允许父组件向子组件的预定义位置插入内容。

- **默认插槽**: 子组件中单个未命名的 `<slot></slot>`。
    
- **具名插槽**: 子组件中使用 `name` attribute 定义，父组件中使用 `v-slot:slotName` 或 `#slotName` 指定。

    ````
    <!-- LayoutComponent.vue -->
    <template>
      <div class="container">
        <header>
          <slot name="header">默认头部</slot>
        </header>
        <main>
          <slot>默认主要内容</slot> <!-- 默认插槽 -->
        </main>
        <footer>
          <slot name="footer">默认底部</slot>
        </footer>
      </div>
    </template>
    ```vue
    <!-- App.vue -->
    <LayoutComponent>
      <template v-slot:header> <!-- 或 #header -->
        <h1>页面标题</h1>
      </template>
    
      <p>这是主要内容区域的一段文本。</p> <!-- 默认插槽内容 -->
    
      <template #footer>
        <p>© 2025 我的应用</p>
      </template>
    </LayoutComponent>
    ````
    
- **作用域插槽**: 允许插槽内容访问子组件的数据。

    ````
    <!-- ItemList.vue -->
    <template>
      <ul>
        <li v-for="(item, index) in items" :key="item.id">
          <!-- 将 item 和 index 绑定到插槽 -->
          <slot name="item" :itemData="item" :itemIndex="index" :isEven="index % 2 === 0"></slot>
        </li>
      </ul>
    </template>
    <script setup>
    defineProps(['items'])
    </script>
    ```vue
    <!-- Parent.vue -->
    <ItemList :items="[{id:1, name:'苹果'}, {id:2, name:'香蕉'}]">
      <template #item="{ itemData, itemIndex, isEven }">
        <div :style="{ color: isEven ? 'green' : 'black' }">
          {{ itemIndex + 1 }}. {{ itemData.name }}
        </div>
      </template>
    </ItemList>
    ````
    

### 9. Composition API (组合式 API) 与 `<script setup>`

Composition API 是一系列 API 的集合，允许我们更灵活地组织和复用组件逻辑，特别适用于大型复杂组件。`<script setup>` 是在单文件组件 (SFC) 中使用 Composition API 的编译时语法糖，极大地简化了代码结构。

**核心优势**:

- **逻辑组织**: 将相关功能的代码 (响应式状态、计算属性、方法、侦听器) 组织在一起，而不是按选项 (data, methods, computed) 分散。
    
- **逻辑复用**: 通过组合式函数 (Composables) 轻松提取和复用状态逻辑。
    
- **类型推导**: 对 TypeScript 更友好，类型推导更自然。
    
- **代码体积**: 更易于 Tree-shaking，可能产生更小的打包体积。
    

组合式函数 (Composables):

一个可复用的逻辑单元，通常是一个返回响应式状态和方法的函数。

例如，一个追踪鼠标位置的 composable:

```javascript
// composables/useMousePosition.js
import { ref, onMounted, onUnmounted } from 'vue'

export function useMousePosition() {
  const x = ref(0)
  const y = ref(0)

  function updateMouse(event) {
    x.value = event.pageX
    y.value = event.pageY
  }

  onMounted(() => {
    window.addEventListener('mousemove', updateMouse)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', updateMouse)
  })

  return { x, y } // 返回响应式数据
}
```

在组件中使用:

```javascript
// MyComponent.vue
<script setup>
import { useMousePosition } from './composables/useMousePosition.js'

const { x, y } = useMousePosition() // 使用组合式函数
</script>

<template>
  <p>鼠标位置: X = {{ x }}, Y = {{ y }}</p>
</template>
```

## 第二部分：Vue Router 使用详解

Vue Router 是 Vue.js 的官方路由管理器，用于构建单页面应用 (SPA)。

### 1. 安装与配置

**安装**:

```javascript
npm install vue-router@4
```

**基本配置 (`src/router/index.js`)**:

```javascript
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue' // 引入视图组件

// 定义路由规则
const routes = [
  {
    path: '/', // 路径
    name: 'Home', // 路由名称 (可选, 但推荐)
    component: HomeView // 对应的组件
  },
  {
    path: '/about',
    name: 'About',
    // 路由懒加载 (推荐):
    // 组件会在第一次被访问时才会被加载，优化初始加载性能
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/:pathMatch(.*)*', // 捕获所有未匹配到的路径 (404 Not Found)
    name: 'NotFound',
    component: () => import('../views/NotFoundView.vue')
  }
]

// 创建 router 实例
const router = createRouter({
  // history 模式:
  // createWebHistory(): HTML5 History 模式 (URL 更美观, 需要服务器配置支持)
  // createWebHashHistory(): Hash 模式 (URL 带 '#', 无需服务器特殊配置)
  history: createWebHistory(import.meta.env.BASE_URL),
  routes, // ES6 缩写, routes: routes
})

export default router
```

**在 `main.js` 中集成**:

```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // 引入 router 实例

const app = createApp(App)
app.use(router) // 注册路由插件
app.mount('#app')
```

**在根组件 `App.vue` 中使用 `<router-view>` 和 `<router-link>`**:

```javascript
// App.vue
<template>
  <div id="app-layout">
    <header>
      <nav>
        <router-link to="/">首页</router-link> |
        <router-link to="/about">关于我们</router-link> |
        <router-link :to="{ name: 'UserProfile', params: { id: '123' }}">用户123</router-link>
      </nav>
    </header>
    <main>
      <router-view /> <!-- 路由出口，匹配到的组件将在此渲染 -->
    </main>
    <footer>版权所有</footer>
  </div>
</template>

<style>
nav a.router-link-exact-active { /* 当前激活路由的链接精确匹配时的样式 */
  color: #42b983;
  font-weight: bold;
}
nav a.router-link-active { /* 当前激活路由的链接包含匹配时的样式 (用于嵌套路由) */
  color: #3ba878;
}
</style>
```

- `<router-link>`: 声明式导航组件，渲染为 `<a>` 标签。`to` prop 指定目标路径或路由对象。
- `<router-view>`: 路由匹配到的组件的渲染出口。
    

### 2. 动态路由匹配

使用动态路径参数 (params) 来匹配一类 URL。

**路由定义**:

```javascript
// router/index.js
// ...
{
  path: '/users/:id', // :id 是动态参数
  name: 'UserProfile',
  component: () => import('../views/UserProfileView.vue'),
  props: true // 将路由参数作为 props 传递给组件 UserProfileView
}
// ...
```

**在组件中接收参数 (`UserProfileView.vue`)**:

```javascript
<template>
  <div>
    <h2>用户详情</h2>
    <p>用户 ID (来自 props): {{ id }}</p>
    <p>用户信息: {{ user?.name }}</p>
    <!-- 也可以通过 useRoute 访问 -->
    <p>当前路径 (来自 useRoute): {{ route.fullPath }}</p>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router' // 组合式 API 访问当前路由信息

// 方式一: 通过 defineProps (当路由配置中 props: true 或 props: (route) => ({ id: route.params.id }))
const props = defineProps({
  id: String // 或 Number, 根据参数类型
})

// 方式二: 通过 useRoute (更通用)
const route = useRoute()
const userIdFromRoute = ref(route.params.id) // 初始值
const user = ref(null)

async function fetchUserData(userId) {
  console.log(`正在为用户 ${userId} 获取数据...`);
  // 模拟 API
  await new Promise(res => setTimeout(res, 300));
  const mockUsers = {
    '123': { id: '123', name: '张三丰', email: 'zhangsanfeng@example.com' },
    '456': { id: '456', name: '李莫愁', email: 'limochou@example.com' }
  };
  user.value = mockUsers[userId] || { id: userId, name: '未知用户' };
}

// 当路由参数变化但组件被复用时 (例如从 /users/123 到 /users/456)
// 需要侦听参数变化来重新获取数据
watch(
  () => route.params.id, // 侦听 route.params.id 的变化
  async (newId) => {
    if (newId) {
      userIdFromRoute.value = newId
      await fetchUserData(newId)
    }
  },
  { immediate: true } // 初始加载时也执行一次 (如果不想与 onMounted 重复，可移除)
)

// 或者，如果使用 props: true, 可以侦听 props.id
// watch(
//   () => props.id,
//   async (newId) => {
//     if (newId) await fetchUserData(newId);
//   },
//   { immediate: true }
// )

// onMounted(async () => {
//   // 初始加载数据，如果 watch 中有 immediate: true，这里可能重复，按需保留
//   await fetchUserData(props.id || route.params.id);
// });
</script>
```

`useRoute()` 返回当前路由的响应式对象。

### 3. 嵌套路由

用于组织复杂的 UI 结构，其中一个组件内部包含自己的 `<router-view>`。

**路由定义**:

```javascript
// router/index.js
import UserLayout from '../views/UserLayout.vue' // 父路由组件，内部有 <router-view>

const routes = [
  // ...
  {
    path: '/user/:userId', // 父路径
    name: 'UserLayout',
    component: UserLayout,
    props: true,
    children: [ // 子路由数组
      {
        path: '', // 默认子路由, 匹配 /user/:userId
        name: 'UserOverview',
        component: () => import('../views/user/UserOverview.vue'),
        props: true
      },
      {
        path: 'profile', // 匹配 /user/:userId/profile
        name: 'UserProfileSub', // 注意与顶层 UserProfile 区分
        component: () => import('../views/user/UserProfileSub.vue'),
        props: true
      },
      {
        path: 'settings', // 匹配 /user/:userId/settings
        name: 'UserSettings',
        component: () => import('../views/user/UserSettings.vue'),
        props: true
      }
    ]
  }
  // ...
]
```

**父路由组件 (`UserLayout.vue`)**:

```javascript
<template>
  <div class="user-layout">
    <h1>用户中心 (ID: {{ userId }})</h1>
    <nav class="sub-nav">
      <router-link :to="{ name: 'UserOverview', params: { userId } }">概览</router-link> |
      <router-link :to="{ name: 'UserProfileSub', params: { userId } }">个人资料</router-link> |
      <router-link :to="{ name: 'UserSettings', params: { userId } }">设置</router-link>
    </nav>
    <hr>
    <div class="user-content">
      <!-- 子路由组件将在此渲染 -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
defineProps({
  userId: String
})
</script>

<style scoped>
.user-layout { padding: 20px; }
.sub-nav { margin-bottom: 15px; }
.user-content { border: 1px solid #eee; padding: 15px; }
</style>
```

### 4. 编程式导航

除了 `<router-link>`，还可以使用 `router` 实例的方法进行导航。

```javascript
<script setup>
import { useRouter } from 'vue-router' // 获取 router 实例

const router = useRouter()

function navigateToHome() {
  router.push('/')
}

function navigateToUser(userId) {
  router.push({ name: 'UserProfile', params: { id: userId } })
}

function navigateWithQuery() {
  router.push({ path: '/search', query: { q: 'vue router', type: 'docs' } })
}

function goBack() {
  router.go(-1) // 或 router.back()
}

function replaceCurrentRoute() {
  router.replace({ name: 'Dashboard' }) // 替换当前历史记录，用户无法通过后退按钮返回
}
</script>
```

**主要方法**:

- `router.push(location)`: 导航到新 URL，添加历史记录。
- `router.replace(location)`: 导航到新 URL，替换当前历史记录。
- `router.go(n)`: 在历史记录中前进或后退 `n` 步。
- `router.back()`: 后退一步。
- `router.forward()`: 前进一步。
### 5. 命名视图 (Named Views)

允许在同一级（同个路由路径下）同时展示多个视图组件，而不是嵌套展示。

**路由定义**:

```javascript
// router/index.js
const routes = [
  {
    path: '/dashboard',
    name: 'DashboardLayout',
    components: { // 注意是 components (复数)
      default: () => import('../views/dashboard/DashboardMain.vue'), // 默认视图
      sidebar: () => import('../components/dashboard/DashboardSidebar.vue'),
      header: () => import('../components/dashboard/DashboardHeader.vue')
    }
  }
]
```

**在布局组件中使用**:

```javascript
<!-- DashboardLayoutContainer.vue (或者直接在 App.vue 如果是顶层布局) -->
<template>
  <div class="dashboard-container">
    <header class="dashboard-header">
      <router-view name="header"></router-view>
    </header>
    <aside class="dashboard-sidebar">
      <router-view name="sidebar"></router-view>
    </aside>
    <main class="dashboard-main-content">
      <router-view></router-view> <!-- 对应 components.default -->
    </main>
  </div>
</template>
```

### 6. 重定向与别名

- **重定向 (`redirect`)**: 当用户访问一个路径时，URL 会被替换成另一个路径，然后匹配新路径。

    ```javascript
    const routes = [
      { path: '/old-features', redirect: '/new-features' },
      { path: '/user/:id/legacy-profile', redirect: to => `/user/${to.params.id}/profile` }, // 动态重定向
      { path: '/admin-home', redirect: { name: 'AdminDashboard' } } // 命名路由重定向
    ]
    ```
    
- **别名 (`alias`)**: 一个路径可以有多个别名。当用户访问别名路径时，URL 保持不变，但路由匹配行为如同访问原始路径。

    ```javascript
    const routes = [
      { path: '/main-page', component: MainPage, alias: ['/home', '/frontpage'] }
      // 访问 /home 或 /frontpage 时，URL 不变，但渲染 MainPage 组件
    ]
    ```
    

### 7. 路由元信息 (Meta Fields)

在路由配置中定义 `meta` 字段，用于附加自定义数据到路由对象。常用于权限控制、页面标题等。

```javascript
// router/index.js
const routes = [
  {
    path: '/admin/panel',
    name: 'AdminPanel',
    component: () => import('../views/AdminPanelView.vue'),
    meta: {
      requiresAuth: true, // 标记此路由需要认证
      roles: ['admin', 'editor'],
      title: '管理面板'
    }
  },
  // ...
]
```

在导航守卫或组件内通过 `route.meta` 访问。

### 8. 导航守卫 (Navigation Guards)

导航守卫用于在路由跳转过程中执行逻辑，例如权限检查、取消导航、数据获取等。

#### a. 全局前置守卫 (`router.beforeEach`)

在每次路由跳转前触发。

```javascript
// router/index.js
router.beforeEach(async (to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('user-token'); // 示例: 检查登录状态
  const pageTitle = to.meta.title || '默认标题';
  document.title = pageTitle; // 设置页面标题

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({
        name: 'Login', // 跳转到登录页
        query: { redirect: to.fullPath } // 保存原目标路径，登录后跳转回来
      });
    } else {
      // 检查角色权限 (如果定义了 meta.roles)
      const requiredRoles = to.meta.roles;
      const userRoles = JSON.parse(localStorage.getItem('user-roles') || '[]');
      if (requiredRoles && !requiredRoles.some(role => userRoles.includes(role))) {
        next({ name: 'UnauthorizedPage' }); // 无权限页面
      } else {
        next(); // 允许导航
      }
    }
  } else {
    next(); // 不需要认证，直接允许导航
  }
});
```

**`next()` 的用法**:

- `next()`: 继续导航。
- `next(false)`: 中断当前导航。
- `next('/')` 或 `next({ path: '/' })`: 跳转到新地址，当前导航被中断。
- `next(error)`: 传递错误给 `router.onError()`。
#### b. 全局解析守卫 (`router.beforeResolve`)

在所有组件内守卫和异步路由组件被解析之后调用。

#### c. 全局后置钩子 (`router.afterEach`)

导航成功完成后调用，不接受 `next` 函数，不会改变导航本身。

```javascript
router.afterEach((to, from, failure) => {
  if (!failure) {
    console.log(`成功导航到: ${to.fullPath}`);
    // 可用于发送页面浏览分析数据等
  } else {
    console.error(`导航失败: ${failure.message}`);
  }
});
```

#### d. 路由独享守卫 (`beforeEnter`)

直接在路由配置中定义。

```javascript
const routes = [
  {
    path: '/premium-content',
    component: PremiumContent,
    beforeEnter: (to, from, next) => {
      if (!isUserPremium()) { // 假设的权限检查函数
        next({ name: 'SubscriptionPage' });
      } else {
        next();
      }
    }
  }
];
```

#### e. 组件内的守卫 (Composition API)

- `onBeforeRouteLeave((to, from, next) => {})`: 导航离开当前组件的路由时调用。
    
- `onBeforeRouteUpdate((to, from, next) => {})`: 当前路由改变，但该组件被复用时调用 (例如带参数的路由)。
    

```javascript
<script setup>
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { ref } from 'vue'

const formIsDirty = ref(false) // 假设表单有未保存的更改

onBeforeRouteLeave((to, from, next) => {
  if (formIsDirty.value) {
    if (confirm('您有未保存的更改，确定要离开吗？')) {
      next()
    } else {
      next(false) // 用户取消，留在当前页面
    }
  } else {
    next() // 表单未修改，直接离开
  }
})

onBeforeRouteUpdate(async (to, from, next) => {
  console.log(`路由更新: 从 ${from.fullPath} 到 ${to.fullPath}`);
  // 例如，根据新的参数重新加载数据
  // await fetchDataForUser(to.params.id);
  next();
})
</script>
```

### 9. 路由懒加载 (Lazy Loading)

将不同路由对应的组件分割成不同的代码块 (chunks)，仅在访问该路由时才加载对应组件，优化初始加载速度。

前面路由定义中已展示：

component: () => import('../views/AboutView.vue')

### 10. 滚动行为 (Scroll Behavior)

控制路由切换时页面的滚动位置。在创建 `router` 实例时配置。

```javascript
// router/index.js
const router = createRouter({
  history: createWebHistory(),
  routes: [...],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      // 如果有保存的滚动位置 (例如通过浏览器后退按钮导航)
      return savedPosition;
    } else if (to.hash) {
      // 如果 URL 中有 hash (例如 #section1)
      return {
        el: to.hash, // 滚动到锚点元素
        behavior: 'smooth', // 平滑滚动效果
        top: 70 // 可选：如果顶部有固定导航栏，设置偏移量
      };
    } else {
      // 默认情况，滚动到页面顶部
      return { top: 0, behavior: 'smooth' };
    }
  }
});
```

## 第三部分：进阶与最佳实践

### 1. 状态管理 (Pinia)

Pinia 是 Vue 官方推荐的状态管理库，轻量、模块化、对 TypeScript 支持友好，并且具有直观的 API。

**安装**: `npm install pinia`

**集成 (`main.js`)**:

```javascript
import { createApp } from 'vue'
import { createPinia } from 'pinia' // 引入
import App from './App.vue'

const app = createApp(App)
app.use(createPinia()) // 使用 Pinia 插件
app.mount('#app')
```

**定义 Store (`stores/counterStore.js`)**:

```javascript
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// 推荐使用函数式 Store (类似 Composition API)
export const useCounterStore = defineStore('counter', () => {
  // state (等同于 ref)
  const count = ref(0)
  const userName = ref('游客')

  // getters (等同于 computed)
  const doubleCount = computed(() => count.value * 2)
  const userGreeting = computed(() => `你好, ${userName.value}!`)

  // actions (等同于 methods)
  function increment(amount = 1) {
    count.value += amount
  }
  function decrement() {
    if (count.value > 0) count.value--
  }
  function loginUser(name) {
    userName.value = name
  }

  // 必须返回所有需要暴露的 state, getters, actions
  return { count, userName, doubleCount, userGreeting, increment, decrement, loginUser }
})
```

**在组件中使用 Store**:

```javascript
<template>
  <div>
    <p>{{ counterStore.userGreeting }}</p>
    <p>计数: {{ counterStore.count }}</p>
    <p>双倍计数: {{ counterStore.doubleCount }}</p>
    <button @click="counterStore.increment(5)">增加 5</button>
    <button @click="counterStore.decrement">减少</button>
    <button @click="counterStore.loginUser('管理员')">登录为管理员</button>
  </div>
</template>

<script setup>
import { useCounterStore } from '@/stores/counterStore' // 引入 store

const counterStore = useCounterStore() // 获取 store 实例
</script>
```

### 2. 异步组件与 Suspense

Vue 3 提供了 `<Suspense>` 组件，用于在等待异步组件加载时显示后备内容。

```javascript
<!-- ParentComponent.vue -->
<template>
  <Suspense>
    <!-- 主要内容，包含异步组件 -->
    <template #default>
      <AsyncUserProfile />
    </template>
    <!-- 加载状态时显示的内容 -->
    <template #fallback>
      <div>正在加载用户数据...</div>
    </template>
  </Suspense>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

// 定义一个异步组件
const AsyncUserProfile = defineAsyncComponent(() =>
  import('./UserProfile.vue') // 假设 UserProfile.vue 内部有异步操作
)
</script>
```

`UserProfile.vue` (异步组件) 内部需要返回一个 Promise (通常是 `async setup()`):

```javascript
<!-- UserProfile.vue -->
<template>
  <div>
    <h2>{{ user.name }}</h2>
    <p>{{ user.email }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const user = ref(null)

// async setup() 会使组件成为异步组件
// 模拟异步数据获取
const fetchUser = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ name: '异步用户', email: 'async@example.com' });
    }, 1500);
  });
};

// 顶层 await 会自动被 <Suspense> 捕获
user.value = await fetchUser();
</script>
```

### 3. Teleport

`<Teleport>` 允许我们将一个组件的内容渲染到 DOM 树的不同位置，通常用于模态框、通知、弹出层等。

```javascript
<template>
  <button @click="showModal = true">打开模态框</button>

  <Teleport to="body"> <!-- 将模态框内容渲染到 body 标签下 -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h3>这是一个模态框</h3>
        <p>此内容被传送到了 body 的末尾。</p>
        <button @click="showModal = false">关闭</button>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'
const showModal = ref(false)
</script>

<style scoped>
.modal-overlay { /* 省略样式 */ }
.modal-content { /* 省略样式 */ }
</style>
```

### 4. 最佳实践和技巧

- **组件设计**:
    
    - **单一职责**: 组件应尽可能小而专注。
        
    - **Props Down, Events Up**: 遵循单向数据流，父组件通过 props 向下传递数据，子组件通过 events 向上通知变化。
        
    - **Dumb vs Smart Components**: 区分纯展示型组件 (Dumb/Presentational) 和包含业务逻辑的容器型组件 (Smart/Container)。
        
- **代码组织**:
    
    - 清晰的目录结构 (如 `src/components`, `src/views`, `src/composables`, `src/stores`, `src/router`, `src/utils`, `src/assets`, `src/services`)。
        
    - 善用组合式函数 (Composables) 封装和复用逻辑。
        
    - 为路由和 Store 模块化组织。
        
- **性能优化**:
    
    - **`v-if` vs `v-show`**: `v-if` 是真正的条件渲染 (惰性，有销毁/重建开销)，`v-show` 只是 CSS `display`切换 (有初始渲染开销)。频繁切换用 `v-show`，运行时条件很少改变用 `v-if`。
        
    - **`key` 的重要性**: 在 `v-for` 中务必使用唯一的 `key`，尤其当列表项是组件或包含状态的 DOM 元素时，以帮助 Vue 高效更新和复用元素。
        
    - **路由懒加载**。
        
    - **图片懒加载**、**虚拟滚动** (处理长列表)。
        
    - 使用 `<KeepAlive>` 缓存不活动的组件实例，避免重复渲染。
        
    - **Tree-shaking**: Vite 等现代构建工具会自动进行，编写易于静态分析的代码有助于优化。
        
    - **Debounce 和 Throttle**: 对频繁触发的事件 (如输入、滚动) 进行节流或防抖处理。
        
- **可维护性**:
    
    - **代码规范**: 使用 ESLint, Prettier, Stylelint 统一代码风格。
        
    - **命名约定**: 组件名 (PascalCase), props/events (camelCase), 文件名 (kebab-case 或 PascalCase)。
        
    - **注释**: 为复杂逻辑、公共 API 添加清晰注释。
        
    - **TypeScript**: 强烈推荐使用 TypeScript 增强代码的健壮性和可维护性。Vue 3 对 TS 支持非常出色。
        
    - **测试**: 编写单元测试 (Vitest, Jest) 和端到端测试 (Cypress, Playwright)。
        
- **安全性**:
    
    - 警惕 XSS 攻击：不要使用 `v-html` 渲染用户输入的内容，除非你确信内容是安全的。
        
    - CSRF 防护：如果使用 cookie 进行会话管理，确保后端有 CSRF 保护机制。
        
    - 依赖管理：定期更新依赖，关注安全漏洞。
        

### 5. 深入学习资源

- **Vue.js 官方文档**: [https://cn.vuejs.org/](https://cn.vuejs.org/ "null") (中文)
    
- **Vue Router 官方文档**: [https://router.vuejs.org/zh/](https://router.vuejs.org/zh/) (中文)
    
- **Pinia 官方文档**: [Pinia | The intuitive store for Vue.js](https://pinia.vuejs.org/zh/ "null") (中文)
    
- **Vite 官方文档**: [https://cn.vitejs.dev/](https://cn.vitejs.dev/ "null") (中文)
    
- **Vue Mastery**: [https://www.vuemastery.com/](https://www.vuemastery.com/ "null") (高质量英文视频课程)
    
- **Vue School**: [https://vueschool.io/](https://vueschool.io/ "null") (英文视频课程和文章)
    

本详细文档覆盖了 Vue.js 3 和 Vue Router 的核心概念、常用功能以及一些进阶主题和最佳实践。精通 Vue.js 需要持续学习和大量实践。希望这份文档能为你的 Vue 之旅提供坚实的基础。
