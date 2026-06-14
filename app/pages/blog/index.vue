<script setup lang="ts">
const { data: page } = await useAsyncData('blog-page', () => {
  return queryCollection('pages').path('/blog').first()
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}
const { data: posts } = await useAsyncData('blogs', () =>
  queryCollection('blog').order('date', 'DESC').all()
)
if (!posts.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'blogs posts not found',
    fatal: true
  })
}

// 提取所有文章中唯一的分类
const allCategories = computed(() => {
  const categories = new Set<string>()
  categories.add('全部')
  posts.value?.forEach((post: any) => {
    if (post.categories && Array.isArray(post.categories)) {
      post.categories.forEach((cat: string) => {
        if (cat) categories.add(cat)
      })
    }
  })
  return Array.from(categories)
})

// 从 URL query 中读取选中的分类
const route = useRoute()
const router = useRouter()
const selectedCategory = ref<string>(route.query.category as string || '全部')

// 监听分类变化，更新 URL
watch(selectedCategory, (newVal) => {
  router.replace({
    query: newVal === '全部' ? {} : { category: newVal }
  })
})

// 根据选中的分类过滤文章
const filteredPosts = computed(() => {
  if (selectedCategory.value === '全部') return posts.value
  return posts.value?.filter((post: any) => {
    return post.categories?.includes(selectedCategory.value)
  })
})

useSeoMeta({
  title: page.value?.seo?.title || page.value?.title,
  ogTitle: page.value?.seo?.title || page.value?.title,
  description: page.value?.seo?.description || page.value?.description,
  ogDescription: page.value?.seo?.description || page.value?.description
})
</script>

<template>
  <UPage v-if="page">
    <UPageHero
      :title="page.title"
      :links="page.links"
      :ui="{
        container: 'pt-16 py-18 sm:py-24 lg:py-24',
        title: '!mx-0 text-left',
        description: '!mx-0 text-left',
        links: 'justify-start'
      }"
    >
      <!-- 标题后面的分类筛选标签 -->
      <template #description>
        <div class="flex flex-wrap gap-2 mt-4">
          <UBadge
            v-for="category in allCategories"
            :key="category"
            :label="category"
            :variant="selectedCategory === category ? 'solid' : 'soft'"
            color="neutral"
            class="cursor-pointer hover:opacity-80 transition-opacity"
            @click="selectedCategory = category"
          />
        </div>
      </template>
    </UPageHero>
    <UPageSection
      :ui="{
        container: '!pt-0'
      }"
    >
      <UBlogPosts orientation="vertical">
        <Motion
          v-for="(post, index) in filteredPosts"
          :key="index"
          :initial="{ opacity: 0, transform: 'translateY(10px)' }"
          :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
          :transition="{ delay: 0.2 * index }"
          :in-view-options="{ once: true }"
        >
          <UBlogPost
            variant="naked"
            orientation="horizontal"
            :to="post.path"
            v-bind="post"
            :ui="{
              root: 'md:grid md:grid-cols-2 md:grid-flow-col-reverse group overflow-visible transition-all duration-300',
              image:
                'group-hover/blog-post:scale-100 rounded-lg shadow-lg border-4 border-muted ring-2 ring-default h-[200px]',
              header:
                index % 2 === 0
                  ? 'overflow-visible order-last'
                  : 'overflow-visible order-last',
              body: 'order-first !p-0 sm:!p-0 lg:!px-0'
            }"
          >
            <!-- 在博客卡片日期后面显示分类标签 -->
            <template #date>
              <div class="flex items-center gap-1.5">
                <span>{{ new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) }}</span>
                <template v-if="post.categories">
                  <UBadge
                    v-for="cat in post.categories"
                    :key="cat"
                    :label="cat"
                    size="xs"
                    variant="subtle"
                    color="neutral"
                  />
                </template>
              </div>
            </template>
          </UBlogPost>
        </Motion>
      </UBlogPosts>

      <!-- 空状态 -->
      <div
        v-if="filteredPosts?.length === 0"
        class="text-center py-16 text-muted"
      >
        暂无该分类下的文章
      </div>
    </UPageSection>
  </UPage>
</template>
