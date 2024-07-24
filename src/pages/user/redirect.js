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

          console.log('로그인 성공:', response.data);
        } catch (error) {
          console.error('에러가 발생했습니다!', error);
        }
      }
    };

    fetchKakaoToken();
  }, []);

  return (
    <div>
      카카오 로그인 중...
    </div>
  );
};

export default RedirectPage;