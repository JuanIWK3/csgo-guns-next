import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

export const ModalAbout = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Contact Us
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        centered
        keyboard={true}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="about-container">
            <div className="ul-wrapper">
              <ul>
                Front End - Juan Israel
                <li>
                  <a
                    href="https://github.com/JuanIWK3"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Github
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/juan-israel-b83a29207/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Linkedin
                  </a>
                </li>
              </ul>
              <ul>
                API - Lucas Campos
                <li>
                  <a
                    href="https://github.com/LucasDotCampos"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Github
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/lucas-rodrigues-5771b5227/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Linkedin
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
