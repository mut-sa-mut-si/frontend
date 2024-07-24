import React, { useEffect } from 'react';
import axios from 'axios';

const RedirectPage = () => {
  const api = 'http://27.96.134.123:8080';

  useEffect(() => {
    const fetchKakaoToken = async () => {
      const code = new URL(window.location.href).searchParams.get("code");

      if (code) {
        try {
          const response = await axios.get(`${api}/api/v1/login/kakao/redirect`, {
            params: {
              code: code
            }
          });

          console.log('�α��� ����:', response.data);
        } catch (error) {
          console.error('������ �߻��߽��ϴ�!', error);
        }
      }
    };

    fetchKakaoToken();
  }, []);

  return (
    <div>
      īī�� �α��� ��...
    </div>
  );
};

export default RedirectPage;