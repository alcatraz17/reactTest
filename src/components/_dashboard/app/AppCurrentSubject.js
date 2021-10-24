import { Card, CardHeader, Alert } from "@mui/material";

export default function AppCurrentSubject(props) {
  const { data } = props;
  // console.log(JSON.stringify(data && data.message));

  return (
    <Card>
      <CardHeader title="Current Subject" />
      <Alert severity="info">{data}</Alert>
    </Card>
  );
}
