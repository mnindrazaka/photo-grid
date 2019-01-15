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
    const printContents = document.getElementById("photoGrid")!.innerHTML
    const originalContents = document.body.innerHTML
    document.body.innerHTML = printContents
    window.print()
    document.body.innerHTML = originalContents
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
