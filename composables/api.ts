import type { QueryBuilderWhere } from "@nuxt/content/types";
import { Article } from "types/article";
import type { Ref } from "vue";
// 需要过滤的where条件
const filter = { title: { $ne: "About Me" } };

// 分页查询首页列表
export const queryIndexList = (skip: number, limit: number) => {
  return useAsyncData("queryIndexList", () => {
    return queryContent("/")
      .where(filter)
      .only(["_path", "title", "description"])
      .skip(skip)
      .limit(limit)
      .sort({ date: -1 })
      .find();
  });
};
// 查询文章总数
export const queryArticleTotal = async (): Promise<number> => {
  try {
    const res = await queryContent("/").where(filter).find();
    return new Promise((resolve, reject) => {
      resolve(res.length);
    });
  } catch (e) {
    return new Promise((resolve, reject) => {
      reject(e);
    });
  }
};

// 查询文章详情
export const queryArticleDetails = async (
  path: string
): Promise<Ref<Pick<Article, string>>> => {
  try {
    const { data: page } = await useAsyncData(
      path,
      queryContent<Article>(path).findOne
    );
    return new Promise((resolve, reject) => {
      resolve(page);
    });
  } catch (e) {
    return new Promise((resolve, reject) => {
      reject(e);
    });
  }
};

// 查询文章上一篇和下一篇
export const queryArticlePreAndNext = async (
  path: string
): Promise<Pick<Article, string>[]> => {
  try {
    const [prev, next] = await queryContent<Article>("/")
      .where(filter)
      .sort({ date: -1 })
      .only(["_path", "title"])
      .findSurround("/" + path);
    return new Promise((resolve, reject) => {
      resolve([prev, next]);
    });
  } catch (e) {
    return new Promise((resolve, reject) => {
      reject(e);
    });
  }
};
