import { Entity, Fields } from "remult"

@Entity("resumes", {
  allowApiCrud: true
})

export class Resume {
  @Fields.autoIncrement()
  id = 0

  @Fields.createdAt()
  creationTime = new Date()

  @Fields.string()
  title = ""
}