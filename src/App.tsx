import { Document, Media, Packer, Paragraph, WidthType } from "docx"
import { saveAs } from "file-saver"
import React, { Component } from "react"
import { Button } from "semantic-ui-react"
import styled from "styled-components"
import InputPhoto from "./components/InputPhoto"
import PhotoGrid from "./components/PhotoGrid"

interface IState {
  photos: IPhoto[]
}

class App extends Component<{}, IState> {
  public state: IState = {
    photos: [],
  }

  public addPhoto(photo: IPhoto) {
    const { photos } = this.state
    photos.push(photo)
    this.setState({ photos })
  }

  public print() {
    const doc = new Document()

    const column = 2
    const row = Math.ceil(this.state.photos.length / column)
    const table = doc.createTable(row, column)
    table.setWidth(WidthType.PERCENTAGE, "100%")

    let imageIndex = 0
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < column; j++) {
        if (imageIndex < this.state.photos.length) {
          const image = Media.addImage(
            doc,
            this.state.photos[imageIndex].arrayBuffer,
            250,
            250,
          )
          table
            .getCell(i, j)
            .addContent(image.Paragraph.center())
            .addContent(
              new Paragraph(this.state.photos[imageIndex].caption).center(),
            )

          imageIndex++
        }
      }
    }

    const packer = new Packer()
    packer.toBlob(doc).then((blob) => {
      saveAs(blob, "example.docx")
    })
  }

  public render() {
    console.log(this.state.photos)
    return (
      <Container>
        <InputPhoto onSubmit={(photo) => this.addPhoto(photo)} />
        <div id="photoGrid">
          <PhotoGrid photos={this.state.photos} />
        </div>
        <Button content="Print" color="blue" onClick={() => this.print()} />
      </Container>
    )
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
`

export default App
