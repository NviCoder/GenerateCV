import { Entity, Fields } from "remult";

@Entity("resumes", {
    allowApiCrud: true,
})
export class Resume {
    @Fields.cuid()
    id = crypto.randomUUID();

    @Fields.createdAt()
    creationTime = new Date();

    @Fields.string()
    title = "";

    @Fields.string()
    content = "";
}
