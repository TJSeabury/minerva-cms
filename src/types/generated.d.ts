export type PageId = import("../schemas/generated").PageId;
export type PageContentBySlug = import("../schemas/generated").PageContentBySlug;

export type PageContent<TPage extends PageId> = PageContentBySlug[TPage];
