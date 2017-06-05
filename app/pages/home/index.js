// @flow
import React, { PureComponent } from 'react'

import style from './style'

class Home extends PureComponent {

    static displayName = '[page] home';

    state = {
        exercise1: [9, 4, 1],
        exercise2: [1, 2, 3, 4, 6, 7, 8, 9, 10]
    };

    onChange = (e) => {
        const { name, value } = e.target;
        const key = name.split('-');
        const state = {
            [key[0]]: [...this.state[key[0]]]
        };

        state[key[0]][key[1]] = parseInt(value, 10);

        this.setState(state);
    };

    middle = (a, b, c) => {
        let result = c;

        if((b < a && a < c) || (c < a && a < b)) {
            result = a;
        } else if((a < b && b < c) || (c < b && b < a)) {
            result = b;
        }

        return result;
    };

    get middleResult() {
        return this.middle(...this.state.exercise1);
    }

    missing = (numbers) => {
        const length = numbers.length + 1;
        const sum = numbers.reduce((prev, current) => prev + current, 0);

        return length * (length + 1) / 2 - sum;
    };

    get missingNumber() {
        return this.missing(this.state.exercise2);
    }

    get elExercise1() {
        return (
            <div className={style['home__box']}>
                <h4 className={style['home__header']}>Exercise #1: Медиана трех чисел</h4>
                <span className={style['home__desc']}>Нужно написать функцию, которая возвращает среднее по значению число из трех чисел.</span>
                <div className={style['home__demo']}>
                    <code className={style['home__code']}>{`
const median3 = (a, b, c) => {
    let result = c;

    if((b < a && a < c) || (c < a && a < b)) {
        result = a;
    } else if((a < b && b < c) || (c < b && b < a)) {
        result = b;
    }

    return result;
};

median3(2, 5, 4); // return 4
                        `}
                    </code>
                    <form className={style['home__form']} onChange={this.onChange}>
                        {this.state.exercise1.map((value, index) => (
                            <label key={index} className={style['home__form-label']}>
                                <span className={style['home__form-title']}>{`Number ${index + 1}`}</span>
                                <input className={style['home__form-input']} name={`exercise1-${index}`} type="number" defaultValue={value} />
                            </label>
                        ))}
                        <div className={style['home__result']}>{this.middleResult}</div>
                    </form>
                </div>
            </div>
        )
    }

    get elExercise2() {
        return (
            <div className={style['home__box']}>
                <h4 className={style['home__header']}>Exercise #2: Задача &quot;Выколотый массив&quot;</h4>
                <span className={style['home__desc']}>Arr - массив чисел от 1 до N, в котором одно число выкинули, а остальной массив перемешали. Требуется написать функцию, которая принимает на вход массив arr и возвращает удаленное число. Решение должно быть линейным, не должно модифицировать исходный массив и использовать дополнительную память.</span>
                <div className={style['home__demo']}>
                    <code className={style['home__code']}>{`
const findMissing = (numbers) => {
    const length = numbers.length + 1;
    const sum = numbers.reduce((prev, current) => prev + current, 0);

    return length * (length + 1) / 2 - sum;
}
                    `}</code>
                    <form className={style['home__form']} onChange={this.onChange}>
                        {this.state.exercise2.map((value, index) => (
                            <label key={index} className={style['home__form-label']}>
                                <span className={style['home__form-title']}>{`Number ${index + 1}`}</span>
                                <input className={style['home__form-input']} min="1" name={`exercise2-${index}`} type="number" defaultValue={value} />
                            </label>
                        ))}
                        <div className={style['home__result']}>{this.missingNumber}</div>
                    </form>
                </div>
            </div>
        )
    }

    get elExercise3() {
        return (
            <div className={style['home__box']}>
                <h4 className={style['home__header']}>Exercise #3: Сложности алгоритмов</h4>
                <div className={style['home__wrap']}>
                    <div className={style['home__logarithm']} data-value="O(ln(n))">Вставка в красно-черное дерево</div>
                    <div className={style['home__logarithm']} data-value="O(ln(n))">Быстрая сортировка в среднем</div>
                    <div className={style['home__logarithm']} data-value="O(1)">Вставка в хеш-таблицу</div>
                    <div className={style['home__logarithm']} data-value="O(n)">Поиск в связном списке</div>
                    <div className={style['home__logarithm']} data-value="O(ln(n))">Двоичный поиск в отсортированном массиве</div>
                    <div className={style['home__logarithm']} data-value="O(ln(n))">Обход красно-черного дерева от большего к меньшему</div>
                    <div className={style['home__logarithm']} data-value="O(n)">Вставка в хеш-таблицу в случае коллизии</div>
                    <div className={style['home__logarithm']} data-value="O(n^2)">&quot;Пузырьковая&quot; сортировка</div>
                    <div className={style['home__logarithm']} data-value="O(n)">Удаление из массива (со сдвигом)</div>
                    <div className={style['home__logarithm']} data-value="O(1)">Поиск в хеш-таблице</div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className={style['home']}>
                {this.elExercise1}
                {this.elExercise2}
                {this.elExercise3}
            </div>
        )
    }

}

export default {
    path  : '/',
    action: () => Home
}
