import React, { Component } from "react"
import { Grid, Header, Image } from "semantic-ui-react"
import styled from "styled-components"

interface IProps {
  photos: IPhoto[]
  onClick: (index: number) => void
}

export default class PhotoGrid extends Component<IProps> {
  public renderPhotos() {
    return this.props.photos.map((photo, index) => (
      <Grid.Column key={index} textAlign="center" verticalAlign="top">
        <Photo src={photo.url} onClick={() => this.props.onClick(index)} />
        <Caption>{photo.caption}</Caption>
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
  cursor: pointer;
`

const Caption = styled.p`
  text-align: center;
  font-size: 16px;
  white-space: pre-line;
  margin-top: 5px;
`
