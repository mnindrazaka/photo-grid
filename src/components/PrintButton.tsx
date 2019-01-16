import { Document, Media, Packer, Paragraph, WidthType } from "docx"
import { saveAs } from "file-saver"
import React, { Component } from "react"
import { Button } from "semantic-ui-react"

interface IProps {
  photos: IPhoto[]
}

export default class PrintButton extends Component<IProps> {
  public doc = new Document()

  public saveDoc() {
    const packer = new Packer()
    packer.toBlob(this.doc).then((blob) => {
      saveAs(blob, "result.docx")
    })
  }

  public createTable() {
    const column = 2
    const row = Math.ceil(this.props.photos.length / column)
    const table = this.doc.createTable(row, column)
    table.setWidth(WidthType.PERCENTAGE, "100%")

    let imageIndex = 0
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < column; j++) {
        if (imageIndex < this.props.photos.length) {
          const image = Media.addImage(
            this.doc,
            this.props.photos[imageIndex].arrayBuffer,
            250,
            250,
          )
          table
            .getCell(i, j)
            .addContent(image.Paragraph.center())
            .addContent(
              new Paragraph(this.props.photos[imageIndex].caption).center(),
            )
          imageIndex++
        }
      }
    }
  }

  public createDoc() {
    this.doc = new Document()
  }

  public print() {
    this.createDoc()
    this.createTable()
    this.saveDoc()
  }

  public render() {
    return (
      <Button
        icon="print"
        content="Print"
        color="blue"
        onClick={() => this.print()}
      />
    )
  }
}
