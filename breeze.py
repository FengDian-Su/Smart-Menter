from openai import OpenAI
import sys

def Breeze_LLM(text):
    client = OpenAI(base_url = "Your Access URL",api_key = "-")
    chat_completion = client.chat.completions.create(
        model = "-",
        messages = [{"role": "user", "content": text}],
        max_tokens = 1000,
        stream = False,
        temperature = 0.01
    )
    return "".join(response.message.content for response in chat_completion.choices)

def Generator(query):
  template = """
  我會給你一份json格式的資料，裡面包含\
  請根據資料回答以下問題，做出回應。
  問題 : {query}
  回應 : """
  #資料 : {data}
  translator = template.format(query = query)
  return Breeze_LLM(translator)


if __name__ == '__main__':
    query = sys.argv[1]
    response = Generator(query)
    print(response)