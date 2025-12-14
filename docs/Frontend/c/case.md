# 案例

## 计算圆的面积和周长

输入圆的半径，输出圆的面积和周长
```c
#include<stdio.h>
int main(){
    float r,area,circumference;
    printf("请输入圆的半径：");
    scanf("%f",&r);
    area = 3.14 * r * r;
    circumference = 2 * 3.14 * r;
    printf("圆的面积是：%.2f\n",area);
    printf("圆的周长是：%.2f\n",circumference);
    return 0;
}
```

## 信息录入

录入学号（整型），分数（浮点数），姓名（字符串），级别（字符），及格（布尔值）

```c
#include<stdio.h>
#include<stdbool.h>
int main(){
    int id;
    float score;
    char level;
    bool pass;
    int temp;
    printf("请输入学号：");
    scanf("%d",&id);
    getchar();
    printf("请输入分数：");
    scanf("%f",&score);
    getchar();
    printf("请输入级别：");
    scanf(" %c",&level);
    getchar();
    printf("请输入是否及格(1=是,0=否)：");
    scanf("%d",&temp);
    pass = temp;
    printf("\n学号：%d\n分数：%.2f\n级别：%c\n是否及格：%d\n",id,score,level,pass);
    return 0;
}
```

## 密码破译
数字转字母

```c
#include<stdio.h>
int main(){
	int a,b,c,d;
	a = 117;
	b = 110;
	c = 100;
	d = 111; 
	printf("%c%c%c%c",a,b,c,d);
	return 0;
} 
```