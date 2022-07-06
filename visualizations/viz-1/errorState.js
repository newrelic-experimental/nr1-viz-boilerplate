import React from 'react';
import { Card, CardBody, HeadingText } from 'nr1';

function ErrorState(props) {
  const { errors } = props;

  return (
    <Card className="ErrorState">
      <CardBody className="ErrorState-cardBody">
        <HeadingText
          className="ErrorState-headingText"
          spacingType={[HeadingText.SPACING_TYPE.LARGE]}
          type={HeadingText.TYPE.HEADING_3}
        >
          Oops! Something went wrong.
        </HeadingText>
        {errors.map(error => (
          <HeadingText
            spacingType={[HeadingText.SPACING_TYPE.MEDIUM]}
            type={HeadingText.TYPE.HEADING_4}
          >
            {error}
          </HeadingText>
        ))}
      </CardBody>
    </Card>
  );
}

export default ErrorState;
