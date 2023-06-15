import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const navigate = useNavigate();
  const backHome = () => {
    navigate("/");
  };
  return (
    <Result
      status="404"
      title="404"
      subTitle="Xin lỗi, Không tìm thấy trang"
      extra={
        <Button onClick={backHome} type="primary">
          Quay về trang chủ
        </Button>
      }
    />
  );
};
export default NotFound;
