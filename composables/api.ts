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
