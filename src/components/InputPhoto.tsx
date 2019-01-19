import React, { Component } from "react"
import {
  Button,
  Form,
  Header,
  Image,
  Input,
  TextArea,
} from "semantic-ui-react"
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
          <Header>Add Your Photo</Header>
          <Input
            type="file"
            onChange={(event) => this.changePhoto(event.target.files![0])}
          />
          <TextArea
            autoHeight
            placeholder="Enter Your Caption"
            value={this.state.photo.caption}
            onChange={(event) => this.changeCaption(event.currentTarget.value)}
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
  height: 250px;
  margin-top: 15px;
  margin-bottom: 15px;
`

const FormContainer = styled(Form)`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;
  margin-right: 15px;
`
