import React, { Component } from "react"
import { Divider, Grid } from "semantic-ui-react"
import styled from "styled-components"
import InputPhoto from "./components/InputPhoto"
import PhotoGrid from "./components/PhotoGrid"
import PrintButton from "./components/PrintButton"

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

  public removePhoto(index: number) {
    URL.revokeObjectURL(this.state.photos[index].url)
    const { photos } = this.state
    photos.splice(index, 1)
    this.setState({ photos })
  }

  public swapPhoto(draggedPhoto: IPhoto, draggedOverPhoto: IPhoto) {
    const { photos } = this.state
    const draggedPhotoIndex = photos.indexOf(draggedPhoto)
    const draggedOverPhotoIndex = photos.indexOf(draggedOverPhoto)

    photos[draggedPhotoIndex] = draggedOverPhoto
    photos[draggedOverPhotoIndex] = draggedPhoto
    this.setState({ photos })
  }

  public render() {
    return (
      <Container>
        <Grid columns="2">
          <Grid.Column>
            <InputPhoto onSubmit={(photo) => this.addPhoto(photo)} />
          </Grid.Column>
          <Grid.Column textAlign="right">
            <PrintButton photos={this.state.photos} />
          </Grid.Column>
        </Grid>
        <Divider />
        <PhotoGrid
          photos={this.state.photos}
          onClick={(index) => this.removePhoto(index)}
          onDrop={(draggedPhoto, draggedOverPhoto) =>
            this.swapPhoto(draggedPhoto, draggedOverPhoto)
          }
        />
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
