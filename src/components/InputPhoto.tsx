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
      arrayBuffer: {} as ArrayBuffer,
    },
  }

  public resetInput() {
    this.setState({
      photo: {
        caption: "",
        url: "",
        arrayBuffer: {} as ArrayBuffer,
      },
    })
  }

  public convertFileToArrayBuffer(file: File) {
    return new Promise<ArrayBuffer>((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsArrayBuffer(file)
      fileReader.onload = () => resolve(fileReader.result as ArrayBuffer)
    })
  }

  public async changePhoto(file: File) {
    const { photo } = this.state
    URL.revokeObjectURL(photo.url)
    photo.arrayBuffer = await this.convertFileToArrayBuffer(file)
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
        <Image src={this.state.photo.url} size="medium" />
      </Container>
    )
  }
}

const Container = styled.div`
  display: flex;
  height: 200px;
  margin-top: 20px;
  margin-bottom: 20px;
`

const FormContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 200px;
  margin-right: 15px;
`
