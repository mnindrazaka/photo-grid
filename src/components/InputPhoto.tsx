import React, { Component } from "react"
import { Button, Image, Input } from "semantic-ui-react"
import styled from "styled-components"

interface IProps {
  onSubmit: (photo: IPhoto) => void
}

interface IState {
  photo: IPhoto
}

export default class InputPhoto extends Component<IProps, IState> {
  public state: IState = {
    photo: {
      caption: "",
      url: "",
      file: {} as File,
    },
  }

  public resetInput() {
    this.setState({
      photo: {
        caption: "",
        url: "",
        file: {} as File,
      },
    })
  }

  public changePhoto(file: File) {
    const { photo } = this.state
    URL.revokeObjectURL(photo.url)
    photo.file = file
    photo.url = URL.createObjectURL(file)
    this.setState({ photo })
  }

  public changeCaption(caption: string) {
    const { photo } = this.state
    photo.caption = caption
    this.setState({ photo })
  }

  public submit() {
    this.resetInput()
    this.props.onSubmit(this.state.photo)
  }

  public render() {
    return (
      <Container>
        <Image src={this.state.photo.url} size="medium" />
        <FormContainer>
          <Input
            type="file"
            label="Photo"
            onChange={(event) => this.changePhoto(event.target.files![0])}
          />
          <Input
            label="Caption"
            value={this.state.photo.caption}
            onChange={(event) => this.changeCaption(event.target.value)}
          />
          <Button
            color="green"
            content="Add Photo"
            onClick={() => this.submit()}
          />
        </FormContainer>
      </Container>
    )
  }
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 200px;
  margin-top: 20px;
  margin-bottom: 20px;
`

const FormContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 200px;
  margin-left: 15px;
`
