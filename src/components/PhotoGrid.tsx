import React, { Component } from "react"
import { Grid, Header, Image } from "semantic-ui-react"
import styled from "styled-components"

interface IProps {
  photos: IPhoto[]
}

export default class PhotoGrid extends Component<IProps> {
  public renderPhotos() {
    return this.props.photos.map((photo, index) => (
      <Grid.Column key={index}>
        <Photo src={photo.url} />
        <Header content={photo.caption} size="small" textAlign="center" />
      </Grid.Column>
    ))
  }

  public render() {
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
`
