## Quokka 설정

---

- 스크린샷 설명
    
    
    ![Untitled](https://user-images.githubusercontent.com/48370582/145716344-bcdc587a-9c18-4655-a336-2afd7160cfac.png)
    1) settings.json에서 편집 버튼을 클릭하면 아래의 스크린샷과 같이 설정 json 파일이 열린다.
    
   
    ![Untitled (1)](https://user-images.githubusercontent.com/48370582/145716351-b19887a7-558b-4c73-b612-29dee0587a02.png)
    2) 맨 아래에 quokka.darkTheme.log.~~~ 속성이 새로 추가된 설정이다.
    color 속성이 글씨 색이고
    backgroundColor가 배경색이다.
    나는 하얀색 배경에 아쿠아마린 글씨 색으로 설정하였다.
    
    ```jsx
    "quokka.darkTheme.log.decorationAttachmentRenderOptions": {
            "border": null,
            "borderColor": null,
            "fontStyle": null,
            "fontWeight": null,
            "textDecoration": null,
            // "color": "rgba(86, 156, 214, 1)",
            "color": "#5e7e9b",
            "backgroundColor": "#ffffff",
            "margin": "1.2em",
            "width": null,
            "height": null
        }
    ```
