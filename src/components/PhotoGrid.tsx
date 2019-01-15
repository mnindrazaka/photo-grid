import React, { Component } from "react"
import { Grid, Header, Image } from "semantic-ui-react"
import styled from "styled-components"

interface IProps {
  photos: IPhoto[]
}

export default class PhotoGrid extends Component<IProps> {
  public renderPhotos() {
    return this.props.photos.map((photo, index) => (
      <Grid.Column key={index} textAlign="center" verticalAlign="middle">
        <Photo src={photo.url} />
        <Caption content={photo.caption} />
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

const Caption = styled(Header)`
  text-align: center;
  font-size: 16px;
`
