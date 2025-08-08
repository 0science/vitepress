# 两数之和

## 题目描述

给定一个整数数组 `nums` 和一个整数目标值 `target`，请你在该数组中找出 **和为目标值** 的那 **两个** 整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。

你可以按任意顺序返回答案。

## 示例

```
输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
```

## 提示

- `2 <= nums.length <= 103`
- `-109 <= nums[i] <= 109`
- `-109 <= target <= 109`
- **只会存在一个有效答案**

## 解题思路
1. 创建一个空对象`map`，用于存储数组中的元素和对应的索引。
2. 遍历数组，对于每个元素，判断`target - nums[i]`是否在`map`中，如果在则返回`[map[target - nums[i]], i]`，否则将当前元素和索引添加到`map`中。
3. 如果遍历结束仍然没有找到满足条件的元素，则返回`[]`。
4. 时间复杂度：O(n)，空间复杂度：O(n)。

## 代码实现

```
function twoSum(nums: number[], target: number): number[] {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);

    return [];

    }
}
```
