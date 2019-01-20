import React, { Component } from "react"
import { Grid, Image } from "semantic-ui-react"
import styled from "styled-components"

interface IProps {
  photos: IPhoto[]
  onClick: (index: number) => void
  onDrop: (draggedPhoto: IPhoto, draggedOverPhoto: IPhoto) => void
}

interface IState {
  draggedPhoto: IPhoto
  draggedOverPhoto: IPhoto
}

export default class PhotoGrid extends Component<IProps, IState> {
  public dragPhoto(event: any, draggedPhoto: IPhoto) {
    event.preventDefault()
    this.setState({ draggedPhoto })
  }

  public dragOverPhoto(event: any, draggedOverPhoto: IPhoto) {
    event.preventDefault()
    this.setState({ draggedOverPhoto })
  }

  public renderPhotos() {
    return this.props.photos.map((photo, index) => (
      <Grid.Column key={index} textAlign="center" verticalAlign="top">
        <Photo
          src={photo.url}
          onClick={() => this.props.onClick(index)}
          onDrag={(event: any) => this.dragPhoto(event, photo)}
          onDragOver={(event: any) => this.dragOverPhoto(event, photo)}
          onDrop={() =>
            this.props.onDrop(
              this.state.draggedPhoto,
              this.state.draggedOverPhoto,
            )
          }
        />
        <Caption>{photo.caption}</Caption>
      </Grid.Column>
    ))
  }

  public render() {
    console.log(this.state)
    return (
      <Grid columns="2" padded>
        {this.renderPhotos()}
      </Grid>
    )
  }
}

const Photo = styled(Image)`
  width: 100%;
  height: 500px;
  object-fit: cover;
  cursor: pointer;
`

const Caption = styled.p`
  text-align: center;
  font-size: 16px;
  white-space: pre-line;
  margin-top: 5px;
`
